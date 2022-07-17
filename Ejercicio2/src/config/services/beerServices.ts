import axios from 'axios';
import {BASE_API} from '../API';
import {Beer} from '../entity/beerType';

const client = axios.create({
  baseURL: `${BASE_API}`,
});

const BeerService = {
  getBeerList: async (pagination: number): Promise<Beer[]> => {
    return client.get(`/beers?page=2&per_page=${pagination}`).then(res => {
      return res.data;
    });
  },
  getBeerDetails: async (id: string): Promise<Beer> => {
    const res = await client.get(`/beers/${id}`);
    return res.data;
  },
};

export default BeerService;
