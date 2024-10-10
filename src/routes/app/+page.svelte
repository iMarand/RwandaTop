<script>
    // @ts-nocheck

    import ActivitiesFootball from "./ActivitiesFootball.svelte";
    import Champions from "./Champions.svelte";
    import { MatchLiveData, MatchNextData} from "./main.data";

    var data = MatchLiveData();
    var dataNext = MatchNextData();

    // import { Main_Events_DOM } from "./app.matches.js";
    import { ACTIVI_RESOURCE, time, elapsed } from './app.js';

    import { onMount, tick } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
	// import { NODE_ENV } from "$env/static/private";

    const MATCHES = ACTIVI_RESOURCE()[0];
    const FEATURED_MATCH = ACTIVI_RESOURCE()[1];
    const GAMES = ["Football", "Volleyball", "Tour d' Rwanda", "Other"];

    var ELE = new Object;
    let mounted = false;
    let _DP_ = "none";

    ELE.SET_LIVE,
    ELE.HAVE_LIVE,
    ELE.SET_UPCOMING,
    ELE.HAVE_MATCHES; 

    onMount(async () => {
        mounted = true;
        _DP_ = "flex";
        // check stored data
    })

    let F = new Intl.DateTimeFormat('en', {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });

    // ----- MATCHES PREVIEW CHECK NON FINE DATA --------------------

    const L = {
        TeamsLive: function() {
            var T_A = Array();
            var T_B = Array();

            // @ts-ignore
            MATCHES.data.map(k => {
                T_A.push(k._MATCH_LIVE);
                T_B.push(k._MATCH_LIVE);
            });

            return [T_A, T_B];
        },

        TeamsUpcome: function() {
            var T_A = Array();
            var T_B = Array();

            // @ts-ignore
            MATCHES.data.map(k => {
                T_A.push(k._MATCH_UPCOMING);
                T_B.push(k._MATCH_UPCOMING);
            });

            return [T_A, T_B];
        }
    };

    // console.log(MATCHES);
    // const _MATCH_LIVE_ = L.TeamsLive()[0];
    // const __TEAMS__UPCOMING = L.TeamsUpcome()[0];

    // ---------- MATCHES NON FINE DATA, CHECK DATA -----------------------

    // console.log(__TEAMS__UPCOMING);

    var _cssTEXT = function(ele, stylesDisplay) {
        ele.style.cssText = stylesDisplay;
    }

    var UPCOMING_ = () => {
        var STYLE_EACH = [
            `display: none; background: red`, 
            `display: block`, 
            `background: transparent;`, 
            `background: #fbfbfb; scale: .98; transition: all 0.3s ease;`
        ];
        var ELEMENTS_TAG = [ELE.HAVE_MATCHES, ELE.HAVE_UPCOMINGS, ELE.SET_LIVE, ELE.SET_UPCOMING];

        ELEMENTS_TAG.map((e, i) => {
            return _cssTEXT(e, STYLE_EACH[i]);
        })
    }
    
    var LIVE_MATCHES_ = () => {
        var STYLE_EACH = [
            `display: none;`, 
            `display: block;`, 
            `scale: .98; transition: all 0.3s ease;`, 
            ``
        ];
        var ELEMENTS_TAG = [ELE.HAVE_UPCOMINGS, ELE.HAVE_MATCHES, ELE.SET_LIVE, ELE.SET_UPCOMING];

        ELEMENTS_TAG.map((e, i) => {
            return _cssTEXT(e, STYLE_EACH[i]);
        })
    }

    // Fine Data From Server
    // ----------------- Matches Preview Page ---------------------------

    var MatchData = {
        displayData: function(n) {
            var _ = data.response[n];

            const S = {
                LEAGUE_INFO: _.league,
                MATCH_STATUS: "Live",
                PLAYING_TEAMS: {
                    AWAY: _.teams.away,
                    HOME: _.teams.home
                },
                GOALS: {
                    G_AWAY: _.goals.away,
                    G_HOME: _.goals.home
                },

                TIME_STATUS: _.fixture.status,
                _ID_: _.fixture.id
            }

            return S;
        },

        displayNext: function(n) {
            var _ = dataNext.response[n];
            // console.log(_);

            const S = {
                LEAGUE_INFO: _.league,
                MATCH_STATUS: "Upcoming",
                PLAYING_TEAMS: {
                    AWAY: _.teams.away,
                    HOME: _.teams.home
                },
                GOALS: {
                    G_AWAY: !_.goals.away ? 0 : _.goals.away,
                    G_HOME: !_.goals.home ? 0 : _.goals.home
                },

                TIME_STATUS: _.fixture.status,
                TIME_NEXT: {
                    _hr: new Date(_.fixture.date).getHours(),
                    _min: new Date(_.fixture.date).getMinutes(),
                    _day: new Date(_.fixture.date).getDate(),
                    _month: new Date(_.fixture.date).getMonth(),
                },
                _ID_: _.fixture.id
            }

            return S;
        },

        IterateNext: function() {
            var NEXTMATCHS_LIST = [];
            var NEXT_LENGTH = dataNext.response.length;

            var dispObj = this.displayNext;
            for(let i = 0; i < NEXT_LENGTH; i++) {
                NEXTMATCHS_LIST.push(dispObj(i));
            }

            return NEXTMATCHS_LIST;
        },

        Iterate: function() {
            var LIVEMATCHS_LIST = [];
            var LIVE_LENGTH = data.response.length;

            var dispObj = this.displayData;
            for(let i = 0; i < LIVE_LENGTH; i++) {
                LIVEMATCHS_LIST.push(dispObj(i));
            }

            return LIVEMATCHS_LIST;
        },

        FeaturedMatch: function(opt) {
            var Rand_Range = function() {
                return Math.floor((Math.random() * (opt.end - opt.start))) + opt.start;
            }

            var rands = Array.from({length: 2}, () => {
                return Rand_Range();
            });

            return rands;
        }
    }

    var MATH_LIVE_ACTUAL = MatchData.Iterate();
    var MATCH_NEXT_ACTUAL = MatchData.IterateNext();

    var option = {
        start: 0,
        end: data.response.length
    }

    let F_MATCH = MatchData.FeaturedMatch(option);
    let _r = data.response;

    var Favo_Save = (z) => {
        console.log(z);

        var _Locally_ = {
            save: function() {
                var i_A = z[0].teams.away.id;
                var i_B = z[0].teams.home.id;

                window.localStorage.setItem("saved_match=" + i_A + i_B, JSON.stringify(z));
            },

            delete: function() {
                var i_A = z[0].teams.away.id;
                var i_B = z[0].teams.home.id;

                window.localStorage.removeItem("saved_match=" + i_A + i_B);
            }
        };

        z[1].classList.contains("bi-star-fill") ? 
           (function deleteFav() {
                z[1].classList.remove("bi-star-fill");
                z[1].classList.add("bi-star");

                _Locally_.delete();
           })() : (function saveFav() {
                z[1].classList.remove("bi-star");
                z[1].classList.add("bi-star-fill");

                _Locally_.save();
        })();
    }

    // ------------Matches Preview State ------------------------

    // console.log(data);

</script>

<main class="app-container" style="display: {_DP_};">
    <h4 style="margin-left: 5px;">Choose Category</h4>
    <section class="upper-menu-s">
        <menu class="category-s">
            {#each GAMES as game}
            <button>
                <span>{game}</span>
            </button>
            {/each}
        </menu>

        <menu class="category-i">
            <p style="width: 62px; background-color: #222c; padding: 4px; border-radius: 6px; font-family: 'Poppins-Regular'; font-size: 13px; color: #fff">{F.format($time)}</p>
            <h4>EN</h4>
            <div class="theme-ld">
                <i class="bi bi-moon moon-li"></i>
            </div>
        </menu>
    </section>

    <section class="main-app-s">
        <Champions></Champions>

        <main class="display-data-vpart">
            {#if mounted}
            <menu class="dataFeatured" in:fly="{{ x: -30, duration: 300 * 10, easing: elasticOut }}" out:fade>
                {#each F_MATCH as v}
                <menu class="playing-match">
                    <div class="look-up-cont">
                        <h3>Featured Match</h3>
                        <button style="outline: none; border: 0" class="bi bi-star" on:click={(L) => { Favo_Save([data.response[v], L.target])}}></button>
                    </div>

                    <div class="match-cont">
                        <figure class="p-names-01">
                            <img src="{_r[v].teams.away.logo}" alt="{_r[v].teams.away.name}"/>
                            <p>{_r[v].teams.away.name}</p>
                        </figure>
                        
                        <figure class="points-div">
                            <div class="timer-lmatch">
                                <span style="font-size: 9px; color: green">{_r[v].fixture.status.long}: {_r[v].fixture.status.elapsed}'</span>
                            </div>
                
                            <div class="goal-mlook">
                                <span class="-point-goal">{_r[v].goals.away}</span>
                                <span> </span>
                                <span class="-point-goal">{_r[v].goals.home}</span>
                            </div>
                        </figure>
                        
                        <figure>
                            <img src="{_r[v].teams.home.logo}" alt="{_r[v].teams.home.name}"/>
                            <p class="p-names-01">{_r[v].teams.home.name}</p>
                        </figure>
                    </div>
                </menu>
                {/each}
            </menu>
            
            {/if}
            <menu class="other-activities">
                <menu class="main-act-vpart">
    
                    {#if mounted}
                    <nav class="sel-nav-vpart">
                        <i class="bi bi-calendar-range-fill"></i>
                        <div class="rtx-tab">
                            <button class="rtx-btn-sel" bind:this={ELE.SET_LIVE} on:click={() => LIVE_MATCHES_()}>
                                <i class="bi bi-circle-fill" style="margin-right: 3px; font-size: 10px"></i>Live
                            </button>
                            <button class="rtx-btn-unsel" id="btn-upcoming" bind:this={ELE.SET_UPCOMING} on:click={() => UPCOMING_()}>Up Coming</button>
                        </div>
                        <input type="search" class="search-tcr-input-2">
                    </nav>
                        
                    <div class="address-matches">
                        <section class="-tmatch-play" bind:this = {ELE.HAVE_MATCHES} in:fly="{{ y: 30, duration: 300 * 10, easing: elasticOut }}" out:fade>
                            <h3 class="divison-jk">Matches Live</h3>
                            {#each MATH_LIVE_ACTUAL as v }
                                <!-- Page Review For Sampling -->
                                <!-- <Activities _TEAMS_LIVE = { v }></Activities> --> 

                                <ActivitiesFootball TEAMS_LIVE = { v }></ActivitiesFootball>
                            {/each}
                            <div class="coming-match-t02">

                            </div>
                        </section>

                        <section bind:this={ELE.HAVE_UPCOMINGS} class="-upcoming-sect">
                            <h3 class="divison-jk">Matches Upcoming</h3>
                            {#each MATCH_NEXT_ACTUAL as v }
                                <ActivitiesFootball TEAMS_NEXT = { v }></ActivitiesFootball>
                            {/each}
                        </section>
                    </div>
                    {/if}
                </menu>
            </menu>
        </main>
    </section>
</main>

<script context="module" src="app.js"></script>

<style>@import './app.min.css';</style>