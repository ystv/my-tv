export const Clapper = {
  getPositions: (): Promise<RichPosition[]> => {
    const positions: RichPosition[] = [
      {
        positionID: 2,
        name: "Camera Op",
        description: "Camera ops are responsible for operating the camera",
        admin: false,
        difficulty: RoleDifficulty.beginner,
        group: "Operators",
        image:
          "https://th.bing.com/th/id/OIP.q-5tnyNU_3VZDh3m3JdWCQHaHa?pid=ImgDet&rs=1",
        pageDescription: "Markdown supported!",
        responsibilites: [
          "Pointing the camera",
          "Listening to the director for where to point",
        ],
        links: [
          {
            title: "Docs wiki page",
            link: "somewhere",
          },
          {
            title: "Shooting tips & tricks",
            link: "somewhere",
          },
        ],
        trainingURL: "video?",
        watching: true,
      },
      {
        positionID: 3,
        name: "Vision mixer",
        description: "Take all the feeds and make a programme!",
        admin: false,
        difficulty: RoleDifficulty.beginner,
        group: "Operators",
        image:
          "https://www.eventstreaming.tv/wp-content/uploads/2016/01/adrain-taplin-eventstreamingtv-webcast-stream-uk-film-video.jpg",
        pageDescription: "Markdown supported!",
        responsibilites: [
          "Pointing the camera",
          "Listening to the director for where to point",
        ],
        links: [
          {
            title: "Docs wiki page",
            link: "somewhere",
          },
          {
            title: "Shooting tips & tricks",
            link: "somewhere",
          },
        ],
        trainingURL: "video?",
        watching: false,
      },
    ];
    return Promise.resolve(positions);
  },
  getGroups: (): Promise<Group[]> => {
    const groups: Group[] = [
      {
        groupID: 1,
        name: "Operators",
        description: "People who operate the equipment",
        teamLead: {
          userID: 0,
          name: "Dom Jane Hall",
          avatar: "somewhere",
        },
        primaryColour: "#FFFFFF",
      },
      {
        groupID: 1,
        name: "Pre-rec",
        description: "Working behind the scenes on making the event happen",
        teamLead: {
          userID: 0,
          name: "Dom Jane Hall",
          avatar: "somewhere",
        },
        primaryColour: "#FFFFFF",
      },
      {
        groupID: 1,
        name: "Technical",
        description: "Working behind the scenes and bodging",
        teamLead: {
          userID: 0,
          name: "Dom Jane Hall",
          avatar: "somewhere",
        },
        primaryColour: "#FFFFFF",
      },
      {
        groupID: 1,
        name: "Computing",
        description:
          "Working behind the scenes and changing everything last minute",
        teamLead: {
          userID: 0,
          name: "Dom Jane Hall",
          avatar: "somewhere",
        },
        primaryColour: "#FFFFFF",
      },
      {
        groupID: 1,
        name: "Post",
        description: "Fixing up the disaster",
        teamLead: {
          userID: 0,
          name: "Dom Jane Hall",
          avatar: "somewhere",
        },
        primaryColour: "#FFFFFF",
      },
    ];

    return Promise.resolve(groups);
  },
  watchPosition: (positionID: number): Promise<void> => {
    console.log(`watching position: ${positionID}`);
    return Promise.resolve();
  },
  unwatchPosition: (positionID: number): Promise<void> => {
    console.log(`unwatching position: ${positionID}`);
    return Promise.resolve();
  },
};

export interface Position {
  positionID: number;
  name: string;
  description: string;
  admin: boolean;
}

enum RoleDifficulty {
  veryHard = 100,
  hard = 80,
  intermediate = 50,
  novice = 20,
  beginner = 0,
}

interface RoleLink {
  title: string;
  link: string;
}

export interface RichPosition extends Position {
  difficulty: RoleDifficulty;
  group: string;
  image: string;
  pageDescription: string;
  responsibilites: string[];
  links: RoleLink[];
  trainingURL: string;
  watching: boolean;
}

export interface Group {
  groupID: number;
  name: string;
  description: string;
  teamLead: SmallUser;
  primaryColour: string;
}

export interface SmallUser {
  userID: number;
  name: string;
  avatar: string;
}
