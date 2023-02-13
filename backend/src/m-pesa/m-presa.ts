import axios from 'axios';
import { btoa } from "../utils/btoa";

const fetchAuthorizationKey = async (url: string, consumerKey: string, consumerSecret: string) => {
  try {
    const response = await axios.get(
      url,
      {
        headers: {
          Authorization:
            'Basic ' +
            btoa(`${consumerKey}:${consumerSecret}`),
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
