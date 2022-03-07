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

export enum SurveyType {
  None = 1,
  NonLiterateSes = 2
}

export enum PromptType {
  Audio = 1,
  Visual = 2
}

export interface ISurvey {
  id: SurveyType;
  promptType: PromptType;
  reqs: ISurveyPreReqs;
  nextSurvey: SurveyType;
  url: string;
}

export interface ISurveyPreReqs {
  [key: string]: number;
}

export interface ISurveyState {
    activeTask: ITask;
    activeTaskIndex: number;
    startTime: number;
    endTime: number;
    duration: number;
    promptComplete: boolean;
    surveyActive: boolean;
    surveyIsCompleted: boolean;
    taskAnswered: boolean;
    shouldLoadNextTask: boolean;
    userId: string;
}

export interface ITask {
  items: Array<ITarget>
  text: string
  audioFile: string
}
