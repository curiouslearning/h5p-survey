export interface IRootState {
    survey: ISurveyState;
    config: any;
    ui: any;
}

export interface ITarget {
    text: string;
    image: any;
    audioFile: [any];
}

export enum ContentType {
  None = "None",
  OralVocab = "OralVocab",
  LetterSound = "LetterSound",
  ReadingVocab = "ReadingVocab",
  SightWords = "SightWords",
  Pseudowords = "Pseudowords",
  NonLiterateSes = "NonLiterateSes"
}

export enum PromptType {
  Audio = 1,
  Visual = 2
}

export interface ISurvey {
  id: ContentType;
  promptType: PromptType;
  reqs: ISurveyPreReqs;
  nextSurvey: ContentType;
  url: string;
}

export interface ISurveyPreReqs {
  [key: string]: number;
}

export interface ISurveyState {
    taskList: Array<ITask>;
    activeTask: ITask;
    activeTaskIndex: number;
    startTime: number;
    endTime: number;
    duration: number;
    promptComplete: boolean;
    surveyActive: boolean;
    surveyIsCompleted: boolean;
    taskAnswered: boolean;
    userId: string;
}

export interface ITask {
  items: Array<ITarget>
  text: string
  audioFile: string
}
