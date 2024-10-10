// @ts-nocheck
import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return function stop() {
        clearInterval(interval);
    };
});

const start = new Date();

export const elapsed = derived(time,
    ($time) => {}
);

var o = new Object({
    Champions: function() {
        var groups = new Map([
            ["Competetions", {
                dataPut: [{
                    imageURL: "./Media/rwandaPL.png",
                    imageAlt: "Rwanda Premier League",
                    c_name: "Rwanda PL",
                    from: "Rwanda"
                }, {
                    imageURL: "./Media/laliga.png",
                    imageAlt: "LaLiga Spain Games",
                    c_name: "LaLiga",
                    from: "Spain",
                }, {
                    imageURL: "./Media/ligue1.png",
                    imageAlt: "Ligue 1 France Games",
                    c_name: "Ligue 1",
                    from: "France"
                }, {
                    imageURL: "./Media/SerieA.png",
                    imageAlt: "Seria A Italy Games",
                    c_name: "Serie A",
                    from: "Italy"
                }, {
                    imageURL: "./Media/prl.png",
                    imageAlt: "Premier League Games from England",
                    c_name: "Premier League",
                    from: "England",
                    style: "width: 40px; height: 40px"
                }, {
                    imageURL: "./Media/bdl.png",
                    imageAlt: "Bundesliga Games From Germany",
                    c_name: "Bundesliga",
                    from: "Germany",
                    style: "width: 60px; height: 60px"
                }],
            }], 
        
            
            ["Regions", {
                dataPut: [{
                    imageURL: "./Media/France.png",
                    imageAlt: "France National Team",
                    c_name: "France Country",
                    from: "France"
                }, {
                    imageURL: "./Media/Germany.png",
                    imageAlt: "Germany National Team",
                    c_name: "Germany Country",
                    from: "Germany"
                }]
            }]
        ]);

        return groups;
    },

    Activities: function() {
        var Mapped = new Map([
            ["App-Matches", {
                data: [{
                    _MATCH_UPCOMING: {
                        MATCH_STATUS: "Upcoming",
                        TEAM_A: {
                            NAME: "Kiyovu Fc",
                            FROM: "Rwanda Premier League",
                            LOGO: "./Media/kiyovu.png",
                            GOAL: 0
                        },
                        TEAM_B: {
                            NAME: "APR Fc",
                            FROM: "Rwanda Premier League",
                            LOGO: "./Media/APR.png",
                            GOAL: 0
                        }
                    }
                }]
            }],

        ]);
            
            return Mapped;
        },
        

})

export function CHAMP_RESOURCE() {
    const TEAMS = o["Champions"]().get("Teams");
    const REGIONS = o["Champions"]().get("Regions");
    const COMPETETIONS = o["Champions"]().get("Competetions");

    return [TEAMS, REGIONS, COMPETETIONS];
};

export function ACTIVI_RESOURCE() {
    const MATCHES = o["Activities"]().get("App-Matches");
    
    return [MATCHES];
}