
<script>
    // @ts-nocheck

    import { onMount } from "svelte";

    onMount(() => {
        var savedEvents = function() {
            var d = Object.entries(localStorage).reduce((arr, [key, value]) => {
                arr[key] = JSON.parse(value);
    
                return arr;
            }, {});
    
            console.log(d);
        }
    
        savedEvents();

    })
</script>
<main class="app-container">
    <h4>Favorites Events</h4>
    <section>

    </section>
</main>