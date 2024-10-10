<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    String.prototype.query = function(f) {
        return f == "all" ? 
            document.querySelectorAll(this) : 
            document.querySelector(this);
    };

    onMount(() => {
        var FEvent = function() {
            var A_Fav = ".bi-star".query('all');
            if(A_Fav[0] == (undefined || null)) {
                setTimeout(() => {
                    FEvent();
                }, 1);

                return false;
            }

            A_Fav.forEach(o => {
                o.onclick = function() {
                    // console.log(this);
                }
            });
        }

        FEvent();
    })

    var isMounted = (q) => {
        var o = new Object({
            c_events: function(ev_name) {
                var Events = new Map([
                    ["RwandaTop", '/'],
                    ["News", "/Sport_News"],
                    ["Videos", "/rockinVideos"],
                    ["Favorites", "/Marked_Favorites"],
                    ["Our Channels", "/channels"],
                    ["Matches", "/app"]
                ]);
    
                for(var t of Events) {
                    switch(ev_name) {
                        case t[0]:
                            let _src_ = Events.get(t[0]);
                            let _orgin_ = window.location.orgin;

                            goto(_src_);
                            return;
                        default:
                            break
                    } 
                };
            }
        });

        if(q.incoming == "URL_TABS") {
            o.c_events(q.name);
        }

    }   
    
    function pressed(m) {
        return isMounted({incoming: 'URL_TABS', name: m});
    }

</script>


<header class="nav-vpart">
    <menu class="nav-lrepr-vpart">
        <button class="li-more-h">
            <i class="bi bi-list li-more-bi"></i>
        </button>
        
        <button style="margin-left: 0px; cursor: pointer" id="rTitle_" on:click = {() => pressed("RwandaTop")}>RockinNews</button>
    </menu>

    <menu class="nav-rrepr-vpart">
        <ul class="Nav-URL">
            <button on:click = {() => pressed("RwandaTop")}>Home</button>
            <button class="highlighted" on:click = {() => pressed("Matches")}>Match</button>
            <button on:click = {() => pressed("Videos")}>Videos</button>
            <!-- <button on:click = {() => pressed("Favorites")}>Favorites</button> -->
            <button on:click = {() => pressed("Our Channels")}>About</button>
        </ul>

    </menu>
</header>
<slot></slot>

<style>@import "./app/app.min.css";</style>