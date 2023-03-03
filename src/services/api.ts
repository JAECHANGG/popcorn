import axios from 'axios';

interface getDetailWeatherData {
  lat: string;
  lon: string;
  api: string | undefined;
}

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5';

export const JSON_API = 'https://pop.herokuapp.com';
export const WEB_API = 'https://pop.herokuapp.com';

export const getPopupData = async () => {
  const { data } = await axios.get(`${JSON_API}/Store`);
  return data; // "Store": []
};

export const getDetailWeatherData = async ({
  lat,
  lon,
  api,
}: getDetailWeatherData) => {
  const { data } = await axios.get(
    `${OPENWEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=kr&units=metric`,
  );
  console.log('api', lat, lon, api);
  return data;
};

export const getDetailAirPollutionData = async ({
  lat,
  lon,
  api,
}: getDetailWeatherData) => {
  const { data } = await axios.get(
    `${OPENWEATHER_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${api}`,
  );
  return data;
};

export const getNewStoreReport = async () => {
  const { data } = await axios.get(`${JSON_API}/newStores`);
  return data;
};

export const getInfoErrReport = async () => {
  const { data } = await axios.get(`${JSON_API}/infoErrModifiContents`);
  return data;
};

export const getUser = async () => {
  const { data: userInfos } = await axios.get(`${JSON_API}/users`);
  return userInfos;
};

export const getLikeHate = async () => {
  const { data } = await axios.get(`${JSON_API}/likeHate`);
  return data;
};

export const getBookMark = async () => {
  const { data } = await axios.get(`${JSON_API}/BookMarkList`);
  return data;
};

export const getFaq = async () => {
  const { data } = await axios.get(`${JSON_API}/FAQ`);
  return data;
};
// const KAKAO_KEY = 'de74e268b76a8e2b1f6b81e6cff5b52f';
// const Kakao = axios.create({
//   baseURL: 'https://dapi.kakao.com',
//   headers: {
//     Authorization: 'KakaoAK ' + KAKAO_KEY,
//   },
// });

// export const getFoodImage = async (params: any) => {
//   const { data } = await Kakao.get('/v2/search/image', {
//     params,
//   });
//   return data;
// };
