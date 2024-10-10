<script>
    // @ts-nocheck

    export var TEAMS_NEXT = {
        LEAGUE_INFO: "League Inforamtion",
        PLAYING_TEAMS: {
            AWAY: "Away Team",
            HOME: "Home Team"
        },
        GOALS: {
            G_AWAY: "Away Team Goals",
            G_HOME: "Home Team Goals"
        },

        TIME_STATUS: "Match Time Status"
    }

    export var TEAMS_LIVE = {
        LEAGUE_INFO: "League Inforamtion",
        PLAYING_TEAMS: {
            AWAY: "Away Team",
            HOME: "Home Team"
        },
        GOALS: {
            G_AWAY: "Away Team Goals",
            G_HOME: "Home Team Goals"
        },

        TIME_STATUS: "Match Time Status"
    }

    const Month = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
</script>

{#if TEAMS_LIVE.MATCH_STATUS == "Live"}
<div class="happening-match-t01" style="border-left: 2px solid #f5f5f5; border-right: 2px solid #f5f5f5;" match-id = "{ TEAMS_LIVE._ID_ ? TEAMS_LIVE["_ID_"] : null }" use:matchDataLive>
    <figure>
        <span>Teams</span>
        <span>Goals</span>
    </figure>
    
    <figure>
        <div>
            <menu class="disp-nk">
                <img src="{TEAMS_LIVE["PLAYING_TEAMS"]["AWAY"].logo}" alt="{TEAMS_LIVE["PLAYING_TEAMS"]["AWAY"].name}"/>
                <menu class="goals-mk">
                    <span class="uv-fm">
                        <span>{TEAMS_LIVE["PLAYING_TEAMS"]["AWAY"].name}</span>
                        <span class="uv-dm">{TEAMS_LIVE["LEAGUE_INFO"].name}</span>
                    </span>
                    <span>{TEAMS_LIVE["GOALS"].G_AWAY}</span>
                </menu>
            </menu>
        </div>
        
        <div>
            <menu class="disp-nk">
                <img src="{TEAMS_LIVE["PLAYING_TEAMS"]["HOME"].logo}" alt="{TEAMS_LIVE["PLAYING_TEAMS"]["HOME"].name}">
                <menu class="goals-mk">
                    <span class="uv-fm">
                        <span>{TEAMS_LIVE["PLAYING_TEAMS"]["HOME"].name}</span>
                        <span class="uv-dm">{TEAMS_LIVE["LEAGUE_INFO"].name}</span>
                    </span>
                    <span>{TEAMS_LIVE["GOALS"].G_HOME}</span>
                </menu>
            </menu>
        </div>
    </figure>

    <figure>
        <div>
            <p style="color: green; font-family: 'Poppins-Medium'; font-size: 12px; margin-left: 5px">{TEAMS_LIVE["MATCH_STATUS"]}: </p>
            <ul class="timer-a-match">
                <span>{TEAMS_LIVE["TIME_STATUS"]['long']} {TEAMS_LIVE["TIME_STATUS"]["elapsed"]}</span>
                <span>'</span>
            </ul>
        </div>
    </figure>
    
</div>
{/if}

{#if TEAMS_NEXT.MATCH_STATUS == "Upcoming"}
<div class="happening-match-t01" match-id = "{ TEAMS_NEXT._ID_ ? TEAMS_NEXT["_ID_"] : null }" style="border-left: 2px solid #f5f5f5; border-right: 2px solid #f5f5f5;" use:matchDataNext>
    <figure>
        <span>Teams</span>
        <span>Goals</span>
    </figure>
    
    <figure>
        <div>
            <menu class="disp-nk">
                <img src="{TEAMS_NEXT["PLAYING_TEAMS"]["AWAY"].logo}" alt="{TEAMS_NEXT["PLAYING_TEAMS"]["AWAY"].name}"/>
                <menu class="goals-mk">
                    <span class="uv-fm">
                        <span>{TEAMS_NEXT["PLAYING_TEAMS"]["AWAY"].name}</span>
                        <span class="uv-dm">{TEAMS_NEXT["LEAGUE_INFO"].name}</span>
                    </span>
                    <span>{TEAMS_NEXT["GOALS"].G_AWAY}</span>
                </menu>
            </menu>
        </div>
        
        <div>
            <menu class="disp-nk">
                <img src="{TEAMS_NEXT["PLAYING_TEAMS"]["HOME"].logo}" alt="{TEAMS_NEXT["PLAYING_TEAMS"]["HOME"].name}">
                <menu class="goals-mk">
                    <span class="uv-fm">
                        <span>{TEAMS_NEXT["PLAYING_TEAMS"]["HOME"].name}</span>
                        <span class="uv-dm">{TEAMS_NEXT["LEAGUE_INFO"].name}</span>
                    </span>
                    <span>{TEAMS_NEXT["GOALS"].G_HOME}</span>
                </menu>
            </menu>
        </div>
    </figure>

    <figure>
        <div>
            <p style="color: red; font-family: 'Poppins-Medium'; font-size: 12px; margin-left: 5px">Match Time: </p>
            <ul class="timer-a-match" style="color: red;">
                <span>GMT {TEAMS_NEXT["TIME_NEXT"]["_hr"]}h:{TEAMS_NEXT["TIME_NEXT"]["_min"]}m {TEAMS_NEXT["TIME_NEXT"]["_day"]}-{Month[TEAMS_NEXT["TIME_NEXT"]["_month"]]} </span>
            </ul>
        </div>
    </figure>
    
</div>
{/if}

<script context="module">
    import { MatchLiveData } from "./main.data";
    import { goto } from "$app/navigation";
	import { writable } from "svelte/store";

    var data = MatchLiveData();

    var sharedData = writable(1);

    var matchDataLive = (e) => {
        e.addEventListener("click", function(b) {
            var targetId = parseInt(e.getAttribute("match-id"));

            var FLMatchObj = () => {
                var MData = data.response;

                return MData.filter((tag, i) => {
                    var fix_id = tag.fixture.id;

                    if(targetId != fix_id) return false;
                    return true;
                })
            };

            sharedData.set(FLMatchObj());
            return goto("app/id?=match-live-id-"+targetId);
        });
    };

    var matchDataNext = (e) => {
        e.addEventListener("click", function(b) {
            var targetId = parseInt(e.getAttribute("match-id"));

            var FLMatchObj = () => {
                var MData = data.response;

                return MData.filter((tag, i) => {
                    var fix_id = tag.fixture.id;

                    if(targetId != fix_id) return false;
                    return true;
                })
            };

            sharedData.set(FLMatchObj());
            return goto("app/id?=match-next-id-"+targetId);
        });
    }

    export var sData = sharedData;
</script>
<style>@import "app.min.css";</style>