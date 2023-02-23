import React, { useEffect } from 'react'
// import data from '../data/popupStore.json';
import { getTodayDate } from './FormatDate';
import { Store, View } from '../types/data/storeInterface';
import { getPopupData } from '../services/api';
import { useQuery } from 'react-query';

// 현재 진행중인 스토어
export const CurrentlyOpen = () => {
  const todayDate = getTodayDate();
  const { isLoading, isError, data, error } = useQuery(
    'popup',
    getPopupData,
  );

   if (isLoading) {
    console.log('로딩중');
    return <p>Loading...</p>;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }

  let currentlyOpen:Store[] = [];
  data.filter((store: Store) => {
  const openDate = Number(store.open.split(".").join(""));
  const closeDate = Number(store.close.split(".").join(""));
  return todayDate >= openDate && todayDate <= closeDate;
}).forEach((store: Store) => {
  currentlyOpen.push(store);
});
return currentlyOpen;
}

// 뷰순위
export const MostViews = () => {
  // const currentlyOpen = CurrentlyOpen();
  // const SortByViews = currentlyOpen.sort((a,b) => b.view.all - a.view.all);
  // const ViewToThree = SortByViews.slice(0, 3);
  // return ViewToThree;
}

// 여성 인기 팝업스토어
export const PopularToWomen = () => {
  const todayDate = getTodayDate();
  const { isLoading, isError, data, error } = useQuery(
    'popup',
    getPopupData,
  );

  if (isLoading) {
    console.log('로딩중');
    return <p>Loading...</p>;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }

  let currentlyOpen:any = [];
  data.filter((store: Store) => {
    const openDate = Number(store.open.split(".").join(""));
    const closeDate = Number(store.close.split(".").join(""));
    return todayDate >= openDate && todayDate <= closeDate;
  }).forEach((store: Store) => {
    currentlyOpen.push(store);
  });
  
  // 여성 조회 많은 순
  const womenViewSort = currentlyOpen.sort((a:Store,b:Store) => b.view.women - a.view.women);
  // 마감 순
  const closingSoon = womenViewSort.sort((a:Store,b:Store) => Number(a.close.split(".").join("")) - Number(b.close.split(".").join("")));
  const womenTopTwo = closingSoon.slice(0, 2); 
  return womenTopTwo;
}

// 남성 인기 팝업스토어
export const PopularToMen = () => {
  const todayDate = getTodayDate();
  const { isLoading, isError, data, error } = useQuery(
    'popup',
    getPopupData,
  );

  if (isLoading) {
    console.log('로딩중');
    return <p>Loading...</p>;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }

  let currentlyOpen:any = [];
  data.filter((store: Store) => {
    const openDate = Number(store.open.split(".").join(""));
    const closeDate = Number(store.close.split(".").join(""));
    return todayDate >= openDate && todayDate <= closeDate;
  }).forEach((store: Store) => {
    currentlyOpen.push(store);
  });
  
  // 남성 조회 많은 순
  const menViewSort = currentlyOpen.sort((a:Store,b:Store) => b.view.men - a.view.men);
  // 마감 순
  const closingSoon = menViewSort.sort((a:Store,b:Store) => Number(a.close.split(".").join("")) - Number(b.close.split(".").join("")));
  const menTopTwo = menViewSort.slice(0, 2); 
  return menTopTwo;
}