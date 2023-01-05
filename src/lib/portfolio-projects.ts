const token = process.env.TOKEN;
const name = process.env.GITHUBNAME;

export interface PortfolioProjects {
    name: string
    description: string
    smallImage: string
    badges: Badges[]
}

export interface Badges {
    name: string
    color: string
}


export async function getProjects() {
    const headers = {
        'Authorization': `bearer ${token}`,
    }
    const body = {
        "query": `{
  user(login: "${name}") {
    repositories(orderBy: {field: UPDATED_AT, direction: DESC}, first: 4) {
      edges {
        node {
          object(expression: "main:portfolio.yml") {
            ... on Blob {
              text
            }
          }
          languages(first: 5) {
            edges {
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
}`
    }
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    })
    const data = await response.json();
    // console.log(data.data?.user.repositories.edges[0].node.object.text)
    // console.log(data.data?.user.repositories.edges[0].node.languages.edges[0].node.name)
    const projects = data.data?.user.repositories.edges;
    // console.log(projects[0].node.languages.edges[0].node.name)
    // return {projects: {name: data.}}
    return createProjects(projects);
}

function createProjects(projects: any) {
    let portfolioProjects: PortfolioProjects[] = [];
    const temp: Badges[][] = projects.map((edge: { node: { languages: { edges: any; }; }; }) => edge.node.languages.edges);
    const languages = temp.map(subArray => subArray.map(obj => obj.node));
    // console.log(languages)
    let image: string;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].node.object) {
            const text = projects[i].node.object.text.split('\n');
            image = `https://raw.githubusercontent.com/resetcat/${text[0]}/main/portfolio/image-small.png`;
            portfolioProjects.push({name: text[0], description: text[1], smallImage: image, badges: languages[i]})
        }
    }
    // console.log(portfolioProjects)
    // console.log(transformedArray)
    return portfolioProjects;
}