export enum ObjectType {
  Activity = "Activity",
  Agent = "Agent",
  Group = "Group",
  StatementReference = "Statement Reference",
  SubStatement = "SubStatement"
}

export enum BucketType {
  basal = "basal",
  ceiling = "ceiling",
  general = "general"
}

export enum InteractionType {
  choice = "choice",
  fillIn = "fill-in",
  likert = "likert",
  longFillIn = "long-fill-in",
  matching = "matching",
  numeric = "numeric",
  other = "other",
  performance = "performance",
  sequencing = "sequencing",
  trueFalse =  "true-false",
}

export interface IAgent {
  objectType?: string;
  name?: string;
  account?: {
    homePage: string;
    name: string;
  }
  mbox?: string;
  mbox_sha1sum?: string;
  openid?: string;
}

export interface IVerb {
  id: string;
  display: {
    [key: string]: string
  };
}

export interface IActivityObject {
  objectType?: ObjectType;
  id: string;
  definition: {
    name?: {[key: string]: string;};
    description?: {[key: string]: string;};
    type?: string;
    moreInfo?: string;
    extensions?: {
      [key: string]: any;
    };
  };
}

export interface IInteractionActivity extends IActivityObject {
  interactionType?: InteractionType;
  correctResponsesPattern?: string[];
}

export interface IChoicesInteraction extends IInteractionActivity {
  choices: string[];
}

export interface IScale extends IInteractionActivity {
  scale: any[];
}

export interface IMatchingInteraction extends IInteractionActivity {
  source?: any[];
  target?: any[];
}

export interface IPerformanceInteraction extends IInteractionActivity {
  steps: any[];
}

export interface IResult {
  score?: {
    scaledScore?: number;
    rawScore?: number;
    minimumScore?: number;
    maximumScore?: number;
  }
  success?: boolean;
  completion?: boolean;
  response?: string;
  duration?: string;
  extensions?: {[key: string]: any};
}

export interface IContext {
  registration?: string;
  instructor?: IAgent | IGroup
  instructorName?: string;
  team?: IGroup;
  contextActivities?: {
    parent?: IActivityObject | IActivityObject[];
    grouping?: IActivityObject | IActivityObject[];
    category?: IActivityObject | IActivityObject[];
    other?: IActivityObject | IActivityObject[];
  }
  language?: string;
  statement?: IStatementRef;
  extensions: {[key: string]: any;};
}

export interface IGroup {
  objectType?: string;
  id?: string;
  name?: string;
  member?: IAgent[];
  mbox?: string;
  mbox_sha1sum?: string;
  openid?: string;
  account?: {
    homePage: string;
    name: string;
  }
}

export interface IAttachment {
  usageType: string;
  display: {[key: string]: string;};
  description?: {[key: string]: string;};
  contentType: string;
  length: number;
  sha2: string;
  fileUrl?: string;
}

export interface IStatementRef {
  objectType: "StatementRef";
  id: string;
}

export interface IStatement<ActorType, ObjectType, ContextType, ResultType> {
  timestamp: string;
  actor: ActorType;
  verb: IVerb;
  object: ObjectType;
  context?: ContextType;
  result?: IResult;
  stored?: string;
  authority?: IAgent | IGroup;
  version: string;
  attachments?: IAttachment[]
}
