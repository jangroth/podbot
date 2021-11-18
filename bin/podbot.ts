#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { PodbotStack } from '../lib/podbot-stack';

const app = new cdk.App();
new PodbotStack(app, 'PodbotStack');
