import { useAppSelector } from '../../hooks';
import {
  ISurveyPreReqs,
  ContentType,
  PromptType
} from '../models'


export interface IContentDef
{
  id: ContentType;
  reqs: ISurveyPreReqs;
  promptType: PromptType,
  nextContent: ContentType,
  url: string;
}
const ERR404 = "http://curiousreader.org/404";

function findReqObj (index: ContentType, contentList: Array<IContentDef>): IContentDef {
  const reqObj = contentList.find((req: IContentDef) => {
    console.log(`comparing ${index} to ${req.id}`)
    if (index as ContentType === req.id) {
      return req;
    }
  });
  return reqObj;
}

export function getPromptType(index: ContentType, contentList: Array<IContentDef>): PromptType {
    const reqObj = findReqObj(index, contentList);
    return reqObj ? reqObj.promptType : PromptType.Audio;
}

export function createRequirementsObject(): ISurveyPreReqs {
  const preReqs = {
    number: 1,
  }
  return preReqs
}
export function loadPreReqs(index: ContentType, contentList: Array<IContentDef>): ISurveyPreReqs {
  const reqObj = findReqObj(index, contentList);
  return reqObj ? reqObj.reqs : {};
}

export function getNextSurveyIndex(
  index: ContentType,
 contentList: Array<IContentDef>
): ContentType {
      const current = findReqObj(index, contentList);
      if (current && current.nextContent) {
        return current.nextContent;
      }
  return ContentType.None;
}

export function getSurveyURL(index: ContentType, contentList: Array<IContentDef>): string {
  const reqObj = findReqObj(index, contentList);
  return reqObj ? reqObj.url : ERR404;
}
export function satisfiesPreReqs(
  state: ISurveyPreReqs,
  index: ContentType,
  contentList: Array<IContentDef>
): boolean {
    const reqObj = findReqObj(index, contentList);
    for (const req in Object.keys(reqObj.reqs)) {
      const target = reqObj.reqs[req];
      const result = state[req]
      if (result && result < target) {
        return false
      }
    }
  return true;
}
