<script>
    // @ts-nocheck

    import { onMount } from 'svelte';
    import { CHAMP_RESOURCE } from './app.js';
    import { fade, fly } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
    import { writable } from 'svelte/store';
    import { MatchLiveData, MatchNextData} from "./main.data";

    
    var data = MatchLiveData();

    const TEAMS = CHAMP_RESOURCE()[0];
    const REGIONS = CHAMP_RESOURCE()[1];
    const COMPETETIONS = CHAMP_RESOURCE()[2];

    let mounted = false;

    onMount(() => {
        setTimeout(() => {
            mounted = true;
        }, 1)
    });

    var HandleChampions = {
        LeagueObjectData: function() {
            var RLD = [];
            var DataLength = data.response.length;

            let c = 0;

            do {
                RLD.push(data.response[c].league);
                c++;
            } while(c < DataLength);

            return RLD;
        },

        LOD_FilterData: {
            FL_LEAGUES: function() {
                var LCD_ = HandleChampions.LeagueObjectData();
                var LCD_SET = new Set();
    
                return LCD_.filter(obj => {
                    if(LCD_SET.has(obj.id)) {
                        return false;
                    }
    
                    LCD_SET.add(obj.id);
                    return true
                })
            },

            FL_COUNTRIES: function() {
                var LCD_ = HandleChampions.LeagueObjectData();
                var LCD_SET = new Set();

                return LCD_.filter(obj => {
                    if(LCD_SET.has(obj.country)) return false;
                    LCD_SET.add(obj.country);
                    
                    return true;
                })
            }
        }
    }

    var LCD_FFL = HandleChampions.LOD_FilterData.FL_LEAGUES();
    var LCD_FFC = HandleChampions.LOD_FilterData.FL_COUNTRIES();

    var LCD_Leagues = writable(HandleChampions.LOD_FilterData.FL_LEAGUES());
    var LCD_Countries = writable(HandleChampions.LOD_FilterData.FL_COUNTRIES());

    let L_NoneFound = false;
    let C_NoneFound = false;

    var searchChampions = (v) => {
        var FL_OUTPUT_L = LCD_FFL.filter(obj => {
            if(obj.name.toLocaleLowerCase().includes(v.toLocaleLowerCase()) == false) {
                return false;
            }

            return true;
        });
        
        var FL_OUTPUT_C = LCD_FFC.filter(obj => {
            if(obj.country.toLocaleLowerCase().includes(v.toLocaleLowerCase()) == false) {
                return false;
            }
    
            return true;
        })

        LCD_Countries.set(FL_OUTPUT_C);
        LCD_Leagues.set(FL_OUTPUT_L);

        switch (true) {
            case v == "":
                LCD_Leagues.set(LCD_FFL);
                LCD_Countries.set(LCD_FFC);

                break;
            case FL_OUTPUT_L[0] == (undefined || null):
                L_NoneFound = true;
                break;
            case FL_OUTPUT_L[0] != (undefined || null):
                L_NoneFound = false;
                break;
            default: "None"; break
        }

        switch (true) {
            case FL_OUTPUT_C[0] == (undefined || null):
                C_NoneFound = true;
                break;
            case FL_OUTPUT_C[0] != (undefined || null):
                C_NoneFound = false;
                break;
            default: "None"; break;
        }
    }

</script>
<aside class="main-aside-vpart">
    <div class="search-tcr">
        <input type="search" class="search-tcr-input"
            on:keyup = {(e) => { searchChampions(e.target.value) }}
            on:keydown = {(e) => { searchChampions(e.target.value)}}>
    </div>
    {#if mounted}
    <div class="competetion-abar" in:fly="{{ y: 30, duration: 300 * 10, easing: elasticOut }}" out:fade>
        <figure class="rep-vbar-part">
            <span>Competetions</span>
        </figure>

        <figure class="vbar-disp is_League" style="--display-before-psuedo-c: {L_NoneFound ? "flex" : "none"}">
            {#each $LCD_Leagues as v }

            <li>
                <div class="img-info-vpart">
                    <img src="{v.logo}" alt="{v.name}" style={v.style ? v.style : null}>
                </div>
                <div class="vbar-disp-mainInfo">
                    <span class="i-mainvInfo">{v.name} </span>

                    <span class="i-country-l">{v.country}</span>
                </div>
            </li>
            {/each}
        </figure>
        
        <figure class="rep-vbar-part">
            <span>Regions</span>
        </figure>

        <figure class="vbar-disp is_Region" style="--display-before-psuedo-r: {C_NoneFound ? "flex" : "none"}">
            {#each $LCD_Countries as v }
                <li>
                    <div class="img-info-vpart">
                        <img src="{v.flag}" alt="{v.country}" style="width: 30px; height: 30px">
                    </div>
                    <div class="vbar-disp-mainInfo">
                        <span class="i-mainvInfo">{v.country} Region</span>
                        <span class="i-country-l">{v.country}</span>
                    </div>
                </li>
            {/each}
        </figure>
    </div>
    {/if}

</aside>

<style>@import "./app.min.css";
    .is_League::before {
        content: "Search Not Found In Competetions";
        position: relative;
        text-align: center;
        /* background-color: red; */
        display: var(--display-before-psuedo-c);
        justify-content: center;
        padding: 20px;
        font-family: 'Poppins-Regular';
        border: 1px solid #ccc;
    }

    .is_Region::before {
        content: "Search Not Found In Regions Matches";
        position: relative;
        text-align: center;
        display: var(--display-before-psuedo-r);
        justify-content: center;
        padding: 20px;
        font-family: 'Poppins-Regular';
        border: 1px solid #ccc;
    }
</style>