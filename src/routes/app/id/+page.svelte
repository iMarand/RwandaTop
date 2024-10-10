<script>
    
    // @ts-nocheck
	import { goto } from "$app/navigation";
    import { MatchLiveData, MatchNextData } from "../main.data";

    var CardsTeams = {
        Home: { Red: 0, Yellow: 0 },
        Away: { Red: 0, Yellow: 0 }
    }

    var TeamStatus = {
        Home: { status: "None" },
        Away: { status: "None" }
    }

    var data, dataN = null;
    $: dataMounted = false;
    $: mountedNext = false;
    $: applyLoad = "block";

    var saveEvents = new Object;
    var DataLive = MatchLiveData();
    var DataNext = MatchNextData();

    var dateN = null;
    const month = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    $: GIVEN_CARDS = {
        away: { YC: [], RC: [] },
        home: { YC: [], RC: [] }
    };

    $: WINS_GOALS = {
        away: [],
        home: []
    }

    var loadedData = () => {
        var isDATA = [];

        var streams = (dataInput, finder) => {
            var response_ = dataInput.response;
            var initialURL = document.URL;

            let l = initialURL.lastIndexOf(finder);
            var targetedId = parseInt(initialURL.slice(l+9, initialURL.length));

            var wdata = response_.filter(obj => {
                if(obj.fixture.id == targetedId) {
                    return obj;
                }
            });

            isDATA.push(wdata);
        }

        let s = [
            [DataLive, "-live-"],
            [DataNext, "-next-"]
        ];

        for(let g of s) {
            streams(g[0], g[1]);
        }

        data = isDATA[0];
        dataN = isDATA[1];

        console.log(data);

        var activateLive = () => {
    
            dataMounted = true;
            var _teams = {
                away: data[0].teams.away.name.toLowerCase(),
                home: data[0].teams.home.name.toLowerCase(),
            };
    
            var events = data[0].events;
            let checkIn = (w, i, i2) => {
                var cReturn = w.team.name.toLowerCase().includes(i) && 
                w.detail.toLowerCase().includes(i2);

                if(i2.includes("goal") && w.detail.toLowerCase().includes("penalty")) {
                    cReturn = w.team.name.toLowerCase().includes(i) && 
                    w.detail.toLowerCase().includes("penalty");
                }

                return cReturn;
            }
    
            var HomeStatus = data[0].teams.home.winner;
            var AwayStatus = data[0].teams.away.winner;
    
            if(HomeStatus == (undefined || null) || AwayStatus == (undefined || null)) {
                HomeStatus = "Equal";
                AwayStatus = "Equal";
            }
    
            TeamStatus.Home.status = HomeStatus;
            TeamStatus.Away.status = AwayStatus;
    
            if(events[0] != (undefined || null)) {
    
                // check for cards
                for(let p of events) {
                    switch (true) {
                        case checkIn(p, _teams.away, "yellow"):
                            CardsTeams.Away.Yellow += 1;
                            GIVEN_CARDS.away.YC.push(p.player.name ? "\t" + p.player.name + "\t" : "Not Mentioned");
                            break;
    
                        case checkIn(p, _teams.away, "red"):
                            CardsTeams.Away.Red += 1;
                            GIVEN_CARDS.away.RC.push(p.player.name ? "\t" + p.player.name + "\t" : "Not Mentioned");
                            break;
                            
                        case checkIn(p, _teams.home, "yellow"):
                            CardsTeams.Home.Yellow += 1;
                            GIVEN_CARDS.home.YC.push(p.player.name ? "\t" + p.player.name + "\t" : "Not Mentioned");
                            break;
                            
                        case checkIn(p, _teams.home, "red"):
                            CardsTeams.Home.Red += 1;
                            GIVEN_CARDS.home.RC.push(p.player.name ? "\t" + p.player.name + "\t" : "Not Mentioned");
                            break;
                        case checkIn(p, _teams.away, "goal"):
                            console.log('wwww');
                            WINS_GOALS.away.push(p.player.name ? "\t" + p.player.name + "\t" : "Not Mentioned");
                            break;
                        case checkIn(p, _teams.home, "goal"):
                            WINS_GOALS.home.push(p.player.name ? "\t" + p.player.name + "\t" : "Not Mentioned");
                            break;
                        
                        default: "None"; break;
        
                    }
                }
            }

        }

        var activateNext = () => {
            mountedNext = true;
            applyLoad = "none";

            data = dataN;
            dateN = new Date(data[0].fixture.date);

            var _teams = {
                away: data[0].teams.away.name.toLowerCase(),
                home: data[0].teams.home.name.toLowerCase(),
            };
    
    
            var events = data[0].events;
            let checkIn = (w, i, i2) => {
                return w.team.name.toLowerCase().includes(i) && 
                    w.detail.toLowerCase().includes(i2);
            }
    
            var HomeStatus = data[0].teams.home.winner;
            var AwayStatus = data[0].teams.away.winner;
    
            if(HomeStatus == (undefined || null) || AwayStatus == (undefined || null)) {
                HomeStatus = "Equal";
                AwayStatus = "Equal";
            }
    
            TeamStatus.Home.status = HomeStatus;
            TeamStatus.Away.status = AwayStatus;

        }

        data[0] ? activateLive() : activateNext();
    }

</script>


<main class="app-container" use:loadedData>
    {#if dataMounted}
    <section class="-tmatch-play">
        <div class="happening-match-t01" match-id = "{ data[0].fixture.id ? data[0].fixture.id : null }" style="height: inherit;">
            <figure>
                <span>Teams</span>
                <span>Goals</span>
            </figure>
            
            <figure>
                <div>
                    <menu class="disp-nk">
                        <img src="{data[0].teams.away.logo}" alt="{data[0].teams.away.name}"/>
                        <menu class="goals-mk">
                            <span class="uv-fm">
                                <span>{data[0].teams.away.name}</span>
                                <span class="uv-dm">{data[0].league.name}</span>
                            </span>
                            <span>{data[0].goals.away}</span>
                        </menu>
                    </menu>
                </div>
                
                <div>
                    <menu class="disp-nk">
                        <img src="{data[0].teams.home.logo}" alt="{data[0].teams.home.name}">
                        <menu class="goals-mk">
                            <span class="uv-fm">
                                <span>{data[0].teams.home.name}</span>
                                <span class="uv-dm">{data[0].league.name}</span>
                            </span>
                            <span>{data[0].goals.home}</span>
                        </menu>
                    </menu>
                </div>
            </figure>
        
            <figure>
                <div>
                    <p style="color: green; font-family: 'Poppins-Medium'; font-size: 12px; margin-left: 5px">Live: </p>
                    <ul class="timer-a-match">
                        <span>{data[0].fixture.status.long} {data[0].fixture.status.elapsed}</span>
                        <span>'</span>
                    </ul>
                </div>
            </figure>

            <p style="margin-left: 10px; font-size: 12px; font-family: 'Poppins-Medium'">Events Of the Match</p>
            <figure class="events-list">

                <div class="away-events">
                    <img src="{data[0].teams.away.logo}" alt="{data[0].teams.away.name}"/>
                </div>

                <div class="referee_space">
                    {#if data[0].events[0] != (undefined || null)}
                        <span class="border-op">
                            <p class="representative-info">Away Team</p>
                            <p>Red Cards: <span>{CardsTeams.Away.Red}</span> </p>
                            <p>Yellow Card: <span>{CardsTeams.Away.Yellow}</span></p>
                            <p>Status: <span>{TeamStatus.Away.status == true ? "Winner" : TeamStatus.Away.status == false ? "Loser" : TeamStatus.Away.status}</span></p>
                        </span>
                        <span class="border-oc">
                            <p class="representative-info">Home Team</p>
                            <p>Red Cards: <span>{CardsTeams.Home.Red}</span></p>
                            <p>Yellow Card: <span>{CardsTeams.Home.Yellow}</span></p>
                            <p>Status: <span>{TeamStatus.Home.status == true ? "Winner" : TeamStatus.Home.status == false ? "Loser" : TeamStatus.Home.status}</span></p>
                        </span>
                    {:else}
                        <span class="border-op">
                            <p class="representative-info">Away Team</p>
                            <p>Red Cards: <span>0</span> </p>
                            <p>Yellow Card: <span>0</span></p>
                            <p>Status: <span>Equal</span></p>
                        </span>
                        <span class="border-oc">
                            <p class="representative-info">Home Team</p>
                            <p>Red Cards: <span>0</span></p>
                            <p>Yellow Card: <span>0</span></p>
                            <p>Status: <span>Equal</span></p>
                        </span>

                    {/if}

                </div>
                <div class="home-events">
                    <img src="{data[0].teams.home.logo}" alt="{data[0].teams.away.name}"/>
                </div>
            </figure>

            <figure class="displayEventsMade">
                {#if data[0].events[0] != (undefined || null)}
                <div class="teamAwayEvents">
                    <p>Events A</p>
                    {#if GIVEN_CARDS.away.RC[0]}
                        <span>Red Cards: </span>
                        {#each GIVEN_CARDS.away.RC as r, i_}
                            <li> - {GIVEN_CARDS.away.RC[i_] ? GIVEN_CARDS.away.RC[i_] : "No Card"}</li>
                        {/each}
                    {/if}
                    {#if GIVEN_CARDS.away.YC[0]}
                        <span>Yellow Cards: </span>
                        {#each GIVEN_CARDS.away.YC as r, i_}
                            <li type="a"> - {GIVEN_CARDS.away.YC[i_] ? GIVEN_CARDS.away.YC[i_] : "No Card"}</li>
                        {/each}
                    {/if}
                    {#if WINS_GOALS.away[0]}
                        <span>Goals: </span>
                        {#each WINS_GOALS.away as r, i_}
                            <li type="a"> - {WINS_GOALS.away[i_] ? WINS_GOALS.away[i_] : "No Goal"}</li>
                        {/each}
                    {/if}
                </div>

                <div class="teamHomeEvents" style="text-align-last: end">
                    <p>Events B</p>
                    {#if GIVEN_CARDS.home.RC[0]}
                        <span>Red Cards</span>
                        {#each GIVEN_CARDS.home.RC as r, i_}
                            <li>{GIVEN_CARDS.home.RC[i_] ? GIVEN_CARDS.home.RC[i_] : "No Card"} -</li>
                        {/each}
                    {/if}
                    {#if GIVEN_CARDS.home.YC[0]}
                        <span>Yellow Cards</span>
                        {#each GIVEN_CARDS.home.YC as r, i_}
                            <li>{GIVEN_CARDS.home.YC[i_] ? GIVEN_CARDS.home.YC[i_] : "No Card"} -</li>
                        {/each}
                    {/if}
                    {#if WINS_GOALS.home[0]}
                        <span>Goals</span>
                        {#each WINS_GOALS.home as r, i_}
                            <li type="a">{WINS_GOALS.home[i_] ? WINS_GOALS.home[i_] : "No Goal"}-</li>
                        {/each}
                    {/if}
                </div>

                {/if}
            </figure>
        </div>
    </section>

    {:else}
       <p style="display: {applyLoad};">Loading Data ....</p>
    {/if}


    {#if mountedNext} 
    <section class="-tmatch-play">
        <div class="happening-match-t01" match-id = "{ data[0].fixture.id ? data[0].fixture.id : null }" style="height: inherit;">
            <figure>
                <span>Teams</span>
                <span>Goals</span>
            </figure>
            
            <figure>
                <div>
                    <menu class="disp-nk">
                        <img src="{data[0].teams.away.logo}" alt="{data[0].teams.away.name}"/>
                        <menu class="goals-mk">
                            <span class="uv-fm">
                                <span>{data[0].teams.away.name}</span>
                                <span class="uv-dm">{data[0].league.name}</span>
                            </span>
                            <span>0</span>
                        </menu>
                    </menu>
                </div>
                
                <div>
                    <menu class="disp-nk">
                        <img src="{data[0].teams.home.logo}" alt="{data[0].teams.home.name}">
                        <menu class="goals-mk">
                            <span class="uv-fm">
                                <span>{data[0].teams.home.name}</span>
                                <span class="uv-dm">{data[0].league.name}</span>
                            </span>
                            <span>0</span>
                        </menu>
                    </menu>
                </div>
            </figure>
        
            <figure>
                <div>
                    <p style="color: red; font-family: 'Poppins-Medium'; font-size: 12px; margin-left: 5px">Upcoming Match: </p>
                    <ul class="timer-a-match">
                        <span style="color: red">{data[0].fixture.status.short} GMT {dateN.getHours()}h:{dateN.getMinutes()}m {dateN.getDate()}-{month[dateN.getMonth()]}</span>
                    </ul>
                </div>
            </figure>

            <p style="margin-left: 10px; font-size: 12px; font-family: 'Poppins-Medium'">Events Of the Match</p>
            <figure class="events-list">

                <div class="away-events">
                    <img src="{data[0].teams.away.logo}" alt="{data[0].teams.away.name}"/>
                </div>

                <div class="referee_space">
                        <span class="border-op">
                            <p class="representative-info">Away Team</p>
                            <p>Red Cards: <span>0</span> </p>
                            <p>Yellow Card: <span>0</span></p>
                            <p>Status: <span>Equal</span></p>
                        </span>
                        <span class="border-oc">
                            <p class="representative-info">Home Team</p>
                            <p>Red Cards: <span>0</span></p>
                            <p>Yellow Card: <span>0</span></p>
                            <p>Status: <span>Equal</span></p>
                        </span>

                </div> 
                
                <div class="home-events">
                    <img src="{data[0].teams.home.logo}" alt="{data[0].teams.away.name}"/>
                </div>
            </figure> 
        </div>
    </section>
    {/if}

    
</main>
<style scoped>@import "../app.min.css"; 
    .-tmatch-play {
        width: 40em;
        height: fit-content;
        padding: 3px;
        background-color: var(--body-light);
        border-radius: 10px;
    }

    .happening-match-t01 {
        box-shadow: var(--box-shadow-app);
        /* height: fit-content; */
    }

    .events-list div {
        margin: 10px;
    }

    .events-list div img {
        width: 8rem;
        height: 8rem;
    }
    .events-list {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }
    .referee_space {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        gap: 15px;
    }

    .border-op {
        padding-right: 20px;
        border-right: 1px solid;
    } 
    
    .border-op, .border-oc {
        font-size: 14px;
        font-family: 'Poppins-Regular';
    }

    .representative-info {
        margin-bottom: 10px;
        font-size: 17px;
        font-family: 'Poppins-Medium';
    }

    .displayEventsMade {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 35px; 
        font-family: 'Poppins-Regular';
        font-size: 16px;
    }

    .displayEventsMade div {
        display: flex;
        flex-flow: column;
        text-wrap: wrap;
        text-overflow: ellipsis;
        max-width: 40%;
        font-size: 16px;
    }

    /* .displayEventsMade div span li {
        font-size: 12px;
    } */

    .displayEventsMade div p {
        font-family: 'Poppins-Regular';
        color: green
    }

    .displayEventsMade div span {
        font-size: 14px;
        color: #000;
        text-decoration: underline;
    }

    .teamAwayEvents li, .teamHomeEvents li {
        font-size: 11px;
        color: #222c
    }

</style> 