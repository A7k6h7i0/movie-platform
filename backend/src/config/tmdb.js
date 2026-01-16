import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { config } from './env.js';

// Check if proxy is needed
const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

export const tmdbAxios = axios.create({
  baseURL: config.tmdbBaseUrl,
  params: {
    api_key: config.tmdbApiKey
  },
  timeout: 30000,
  httpsAgent: agent, // ⬅️ ADD PROXY SUPPORT
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

tmdbAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('TMDB API Error:', error.response?.data || error.message);
    throw error;
  }
);
