import {PortfolioProjects} from "./portfolio-projects";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: 'any.env'});
}
const token = process.env.TOKEN;
const name = process.env.GITHUBNAME;

export interface Props {
    name: string
    htmlUrl: string
    bio: string
    contribution: Contribution[]
    projects: PortfolioProjects[]
}

export interface Contribution{
    count: number;
    date: string;
    level: number;
}


export async function getContributions() {
    const headers = {
        'Authorization': `bearer ${token}`,
    }
    const body = {
        "query": `{
  user(login: "${name}") {
    name
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionLevel
            contributionCount
          }
        }
      }
    }
    bio
    avatarUrl
    url
  }
}`
    }
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    })
    const data = await response.json().then(a => a.data.user);

    let contribution: Contribution[] = [];
    const weeks = data.contributionsCollection.contributionCalendar.weeks;
    weeks.forEach((week: { contributionDays: any[]; }) => week.contributionDays.forEach((day: any) => {
        contribution.push({date: day.date, level: stringToNumber(day.contributionLevel), count: day.contributionCount})
    }))

    // return {props: {name: data?.name, htmlUrl: data?.url, bio: data?.bio, contribution: contribution, avatarUrl:data.avatarUrl}}
    return {name: data?.name, htmlUrl: data?.url, bio: data?.bio, contribution: contribution, avatarUrl:data.avatarUrl}
}
export function stringToNumber(level:string):number{
       let numberLevel:number;
    switch (level){
        case 'NONE':
            numberLevel=0;
            break
        case 'FIRST_QUARTILE':
            numberLevel=1;
            break
        case 'SECOND_QUARTILE':
            numberLevel=2;
            break
        case 'THIRD_QUARTILE':
            numberLevel=3;
            break
        case 'FOURTH_QUARTILE':
            numberLevel=4;
            break
        default:
            numberLevel= -1;
    }
    return numberLevel;
}
