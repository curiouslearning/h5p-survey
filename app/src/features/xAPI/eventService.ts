declare var H5P: any;

H5P = H5P || {};

import * as models from './eventModels';
import { ITarget, ITask } from '../models';
export default class EventService {
  H5PDispatcher: any;
  constructor() {
    this.H5PDispatcher = new H5P.EventDispatcher();
  }
  logAgentProfileUpdatedEvent(e: any) {
    const agentProfile = {
      agent: {
        name: e.agentName? e.agentName : "anonymous",
        account: {
          homepage: e.organization? e.organization : 'https://literacytracker.org',
          name: e.uuid? e.uuid: 'anonymous'
        }
      },
      ...e
    }
    const event = new H5P.Event('xAPI', {agentProfile: agentProfile}, {external: true});
    // console.log(event);
    this.H5PDispatcher.trigger(event);
  }

  logAnsweredEvent(name: string, e: any) {
    var xAPIEvent = this.H5PDispatcher.createXAPIEventTemplate(name);
    xAPIEvent.data.statement.actor = this.getActor(e.userId, e.organization, e.agentName);
    xAPIEvent.data.statement.object['objectType'] = 'Activity';
    var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
    // Clean html markup from the question
    var div = document.createElement("div");
    div.innerHTML = e.text;
    var taskText = div.textContent || div.innerText || "";
    // console.log({ definition })
    definition.description = {
        'en-US': taskText.replace(/(\r\n|\n|\r)/gm,"")
    }
    definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
    definition.interactionType = 'choice';
    definition.correctResponsesPattern = [];
    definition.choices = [];
    // Add answer options and answer pattern here
    e.items.forEach((item: any, index: number) => {
        div.innerHTML = item.text;
        definition.choices.push({
            id: 'option-' + index,
            description: {
                'en-US': (div.textContent || div.innerText || '').replace(/(\r\n|\n|\r)/gm,""),
            },
        });
    })
    xAPIEvent.data.statement.object['id'] = `https://data.curiouslearning.org/xAPI/activities/survey/${e.survey}/question/${e.text}`;
    xAPIEvent.data.statement['result'] = {
      response: 'option-' + e.selectedOptionIndex,
      duration: `PT${e.duration/1000}S`
    };
    xAPIEvent.data.statement['context'] = {
      registration: e.registration,
      contextActivities: {
        parent: [{
          id: `https://data.curiouslearning.org/xAPI/activities/survey/${e.survey}`
        }]
      }
    };
    xAPIEvent.data.statement.timestamp = new Date(Date.now()).toISOString();

    // Add info about the selected answer
    this.H5PDispatcher.trigger(xAPIEvent);
  }

  logSurveyObjectStatement(verb: string, e: any) {
    let xAPIEvent = this.H5PDispatcher.createXAPIEventTemplate(verb);
    xAPIEvent.data.statement.actor = this.getActor(e.userId, e.organization, e.agentName);
    xAPIEvent.data.statement.object['id'] = `https://data.curiouslearning.org/xAPI/activities/survey/${e.survey}`;
    xAPIEvent.data.statement.object['objectType'] = 'Activity';
    let definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
    definition.type = 'http://adlnet.gov/expapi/activities/survey';
    xAPIEvent.data.statement.timestamp = new Date(Date.now()).toISOString();
    xAPIEvent.data.statement['result'] = {
      completion: e.completion? e.completion: false,
      duration: e.duration ? `PT${e.duration/1000}S` : null
    }
    xAPIEvent.data['context'] = {
      registration: e.registration
    }
    this.H5PDispatcher.trigger(xAPIEvent);
  }
  logCompletedStatement(e: any) {
    this.H5PDispatcher.triggerXAPICompleted(e.score, e.maxScore, e.success);
  }
  logRegisteredStatement(actor: models.IAgent, groupId: string) {
    let xAPIEvent = this.H5PDispatcher.createXAPIEventTemplate('registered');
    xAPIEvent.actor = {
      objectType: "Agent",
      account: actor.account
    };
    xAPIEvent.object = {
      name: groupId,
      objectType: models.ObjectType.Group,
      account: {
        homePage: 'https://curiouslearning.org',
        name: groupId
      }
    }
    xAPIEvent.data.statement.timestamp = new Date(Date.now()).toISOString();
    this.H5PDispatcher.trigger(xAPIEvent);
  }
  getActor(id: string, organization: string, agentName: string): models.IAgent {
    return {
      objectType: "Agent",
      ...this.getAgent(id, organization, agentName)
    }
  }
  getAgent(id:string, organization: string, agentName: string): models.IAgent {
      return {
        name: agentName? agentName: 'anonymous',
        account: {
          homePage: organization? organization : 'curiouslearning',
          name: id?id:'anonymous'
        }
      };
  }

  logEvent(name: string, e: any) {
    switch(name) {
      case 'answered':
        this.logAnsweredEvent(name, e);
        break;
      case 'initialized':
        this.logSurveyObjectStatement(name, e);
        break;
      case 'registered':
        this.logRegisteredStatement(e.actor, e);
        break;
      case 'terminated':
        this.logSurveyObjectStatement(name, e);
        break;
      case 'scored':
        this.logAnsweredEvent(name, e);
        break;
      case 'agentProfileUpdated':
        this.logAgentProfileUpdatedEvent(e);
        break;
      default:
        break;
    }
  }
};
