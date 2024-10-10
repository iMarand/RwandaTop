import data from "$lib/data_1.json";
import dataNext from "$lib/next-match.json";
import news from "$lib/news.json";

export var MatchLiveData = () => {
    return data;
} 

export var MatchNextData = () => {
    return dataNext;
}

export var SportRockinNews = () => {
    return news;
}