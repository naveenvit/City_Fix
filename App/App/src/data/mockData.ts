import { Issue, Report } from '../types';

export const communityIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Elm Street',
    category: 'Roads',
    address: '123 Elm Street',
    votes: 23,
    status: 'Reported',
    image: 'https://s3-alpha-sig-oac.figma.com/img/ef00/2a5c/a82bc387e77cfe7f1baa34490ec67765?Expires=1759104000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TEloBqEzQYNIMJ8pXJCxYzisibJIomuwz4IkHaURZT8Wbih5j--EKH66xyL7pTC-I2eJl~B7LkM6CQ82tE2nkSY5FPpYP~6qrzTMfRBWVJKGcpYxS9M8s5u1-wOH2hgbVwljMF8E9zXtoL~4TJ4Ly5c5ZK8Jz9ngzk~u0lRBu4y0W~v7gs77cY~QZgJbw5fL0Paf3mu9Vi~6YkgXGnUWWU0~53DLqP~a0bRTqjCRCGs0IuubrmBKQdNxpFpUQdaQgEhkRMghZjWmhEPmAUtx0YyEnWodqh9Y-wS8LiWBw99Yj7zXAAc7JmQVF87UhWBGOGLQM8vfvT9NmNmsWqpwFg__'
  },
  {
    id: '2',
    title: 'Pothole on Oak Avenue',
    category: 'Roads',
    address: '456 Oak Avenue',
    votes: 18,
    status: 'Reported',
    image: 'https://s3-alpha-sig-oac.figma.com/img/446d/9ca8/b81261d197428fda8de5993cd5c1b642?Expires=1759104000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mXxtI-JO2pm6E~cOO7WSX-lhEdDCGj02VhqffJ4soBsVr9nErz8FMdgHb3WI1feaPqf8pMkutwVD-7miTqlHONJmytP8C6pU5fvgZH~VZy132RfT1zmESD1NNhESnAjorFEyy7UZMtcdSx~5f6o6JRIibmMFRYfnJAhrdJ0AXYvUkFl6oww1~Zq12pepVr23LWQtZTOxCAEku7Za9xcowsNentJX9L4VsLy5~dUTmAH2kinb8OC~vBkhxEhdm0pTvlT-B-vpgNv3rVzZ96vwJXIzqgmczLvSt2ThbK140oki7tGnkmVMrmTPD93jfmpD3KRwJmJQf9XjsC8MAyW~sA__'
  },
  {
    id: '3',
    title: 'Pothole on Maple Drive',
    category: 'Roads',
    address: '789 Maple Drive',
    votes: 15,
    status: 'Reported',
    image: 'https://s3-alpha-sig-oac.figma.com/img/fd79/1cef/e7e29bfdfaf8ff52c5d7bd34d81c34a9?Expires=1759104000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GXVDj~COICyF2lc5InsxiYlaQQ~r2Uc9nkBpBWKEmp~DFMYK~27iCxrJZxPrzEhDH2p1iZIkMjwiSJYmwEifCaJvWfnrH0ZPHPmV64lbsIBX13~ZaUNulkTCbuKigF2kE3W6fIiq6YQY7hbLDcVm-YiGeG6XDoWy1lFX8bWlN8p4kcl9ldIixD2ksxKQ6VcDjHYZ0E4Oa4wnO1gT4z7liWMwCUurcgkYEcVAc5tZQcJxh-2vRVBA2rpg43RVXYJtHLu~V008x7wz59t-GNGk5Md8M3yWvYAGJDK0ZhCU9-XdTqwUwDDJoZEizKGWEzHYmuaidpKAKXm6siqQzRbqNg__'
  }
];

export const myReports: Report[] = [
  {
    id: '1',
    title: 'Pothole on Elm Street',
    category: 'Road Maintenance',
    address: '123 Elm Street',
    votes: 23,
    status: 'Reported',
    image: 'https://s3-alpha-sig-oac.figma.com/img/ef00/2a5c/a82bc387e77cfe7f1baa34490ec67765?Expires=1759104000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TEloBqEzQYNIMJ8pXJCxYzisibJIomuwz4IkHaURZT8Wbih5j--EKH66xyL7pTC-I2eJl~B7LkM6CQ82tE2nkSY5FPpYP~6qrzTMfRBWVJKGcpYxS9M8s5u1-wOH2hgbVwljMF8E9zXtoL~4TJ4Ly5c5ZK8Jz9ngzk~u0lRBu4y0W~v7gs77cY~QZgJbw5fL0Paf3mu9Vi~6YkgXGnUWWU0~53DLqP~a0bRTqjCRCGs0IuubrmBKQdNxpFpUQdaQgEhkRMghZjWmhEPmAUtx0YyEnWodqh9Y-wS8LiWBw99Yj7zXAAc7JmQVF87UhWBGOGLQM8vfvT9NmNmsWqpwFg__',
    reportedDate: '2024-08-10',
    expectedResolution: '2024-08-15'
  },
  {
    id: '2',
    title: 'Streetlight Outage',
    category: 'Public Safety',
    address: '456 Oak Avenue',
    votes: 12,
    status: 'In Progress',
    image: 'https://s3-alpha-sig-oac.figma.com/img/460c/8166/506d60817ddc10cd8942b13d61184688?Expires=1759104000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AAZAiy9os0DYO~-AtrFwBk8Wns1y0cS7zCrY4btKsY02qEF8uboz7KPjmziTKEwRHb2IOsrZrXxFfAKJmpWp5r7gLqcNxxbylKXPokGHjPSK5wgRBMGI7dPtu5hcVHYN6yCscawTwlOZ5a9R2hmetp5~5QPmplvwcssl697fJ8rzB6-J9FJbvWZ7hILVPxpyCkbP0qQAMbnTPbLFDDjMnQvVSFCbG060Z5aSwMhS6tekt69AWkh-LxhFtonpzLQymeVlfwfXDh6PtQxXP9P2MaepoLRPbWfN21YgykDJaheI1wajTERn2cBkQl~pYzlqdY2PAOqDtIkmCqoq5WARjg__',
    reportedDate: '2024-08-05',
    expectedResolution: '2024-08-10',
    progress: 60
  },
  {
    id: '3',
    title: 'Graffiti Removal',
    category: 'Community Improvement',
    address: '789 Maple Drive',
    votes: 8,
    status: 'Resolved',
    image: 'https://s3-alpha-sig-oac.figma.com/img/fd79/1cef/e7e29bfdfaf8ff52c5d7bd34d81c34a9?Expires=1759104000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GXVDj~COICyF2lc5InsxiYlaQQ~r2Uc9nkBpBWKEmp~DFMYK~27iCxrJZxPrzEhDH2p1iZIkMjwiSJYmwEifCaJvWfnrH0ZPHPmV64lbsIBX13~ZaUNulkTCbuKigF2kE3W6fIiq6YQY7hbLDcVm-YiGeG6XDoWy1lFX8bWlN8p4kcl9ldIixD2ksxKQ6VcDjHYZ0E4Oa4wnO1gT4z7liWMwCUurcgkYEcVAc5tZQcJxh-2vRVBA2rpg43RVXYJtHLu~V008x7wz59t-GNGk5Md8M3yWvYAGJDK0ZhCU9-XdTqwUwDDJoZEizKGWEzHYmuaidpKAKXm6siqQzRbqNg__',
    reportedDate: '2024-07-20',
    resolvedDate: '2024-08-01'
  }
];
