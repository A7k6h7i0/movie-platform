import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { config } from './env.js';

// Check if proxy is needed
const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

export const justWatchAxios = axios.create({
  baseURL: 'https://apis.justwatch.com/content',
  timeout: 30000,
  httpsAgent: agent,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'MovieHub/1.0'
  }
});

// Add API key to requests
justWatchAxios.interceptors.request.use((config) => {
  if (config.params) {
    config.params.api_key = config.justWatchApiKey;
  } else {
    config.params = { api_key: config.justWatchApiKey };
  }
  return config;
}, (error) => Promise.reject(error));