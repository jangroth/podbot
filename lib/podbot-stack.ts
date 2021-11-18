import * as lambda from '@aws-cdk/aws-lambda';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';


export class PodbotStack extends cdk.Stack {

  public readonly botNotifier: lambda.Function;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const chatId = ssm.StringParameter.valueForStringParameter(this, '/podbot/telegram/chat-id');
    const botToken = ssm.StringParameter.valueForStringParameter(this, '/podbot/telegram/bot-token');

    this.botNotifier = new lambda.Function(this, 'BotNotifier', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'botnotifier.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        BOT_TOKEN: botToken,
        CHAT_ID: chatId
      }
    });

    const topic = new sns.Topic(this, 'BotNotificationTopic');
    topic.addSubscription(new subscriptions.LambdaSubscription(this.botNotifier));
  }
}
