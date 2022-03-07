import { useAppSelector } from '../../hooks';
import {
  ISurvey,
  ISurveyPreReqs,
  SurveyType,
  ISurveyState,
  PromptType
} from '../models'
import preReqs from './preReqs.json'


const ERR404 = "http://curiousreader.org/404";
console.log(preReqs);

function findReqObj (index: SurveyType): ISurvey {
  const reqObj = preReqs.find((req: ISurvey) => {
    const parsedId = parseInt(req.id.toString());
    const parsedIndex = parseInt(index.toString());
    console.log(`comparing ${parsedId} to ${parsedIndex}`);
    if (parsedId === parsedIndex) {
      return req;
    }
  });
  return reqObj;
}

export function getPromptType(index: SurveyType): PromptType {
  if(preReqs) {
    const reqObj = findReqObj(index);
    return reqObj ? reqObj.promptType : PromptType.Audio;
  }
  return PromptType.Audio;
}

export function createRequirementsObject(): ISurveyPreReqs {
  const preReqs = {
    number: 1,
  }
  return preReqs
}
export function loadPreReqs(index: SurveyType): ISurveyPreReqs {
  if(preReqs) {
    const reqObj = findReqObj(index);
    return reqObj ? reqObj.reqs : {};
  }
  return {};
}

export function getNextSurveyIndex(
  index: number
): SurveyType {
  if (preReqs) {
    const current = findReqObj(index);
    if (current && current.nextSurvey) {
      return current.nextSurvey;
    }
  }
  return SurveyType.None;
}

export function getSurveyURL(index: SurveyType): string {
  if (preReqs) {
    const reqObj = findReqObj(index);
    return reqObj ? reqObj.url : ERR404;
  }
  return ERR404;
}
export function satisfiesPreReqs(
  state: ISurveyPreReqs,
  index: SurveyType
): boolean {
  if (preReqs) {
    const reqObj = findReqObj(index);
    for (const req in Object.keys(reqObj.reqs)) {
      const target = reqObj.reqs[req];
      const result = state[req]
      if (result && result < target) {
        return false
      }
    }
  }

  return true;
}
