<script>
    // @ts-nocheck

    import realTimeNews_1 from "$lib/RealTimeNewsAPI_100RMONTH.json";
    import newsNow from "$lib/NewsNow.json";

    console.log(newsNow);

    var data = realTimeNews_1.data;
    function SimplePagination() {
        var content = Array.from({length: 100}, (_, i) => {
            return "content_ :" + i;
        });
    
        var currentPage = 0;
    
        var PageNumbers = Math.ceil(content.length / 10);
        var PageNumArray = Array.from({length: PageNumbers}, (_, i) => {
            return i;
        })
    }

</script>
<section class="headline-rep">
    <div class="news-headline-vpart">
        <h2 class="repre-rocknews">RockinNews Hub</h2>
        <p class="repre-par">Explore Different News Happening In Our World</p>
        <button class="Goto_news_high">Go to Highlights</button>
    
    </div>

    <div class="news-image-headline-vpart">
        <img src="../Media/hallo.png" alt="">
    </div>
</section>
<main class="app-container">
    <section class="main-news-section">
        <nav class="filter-tab-news">
            <menu>
                <p>Filter News</p>
                <button>Sport News</button>
                <button>Other News</button>
            </menu>

            <menu>
                <i class="bi bi-calendar-range-fill calender_news"></i>
            </menu>
        </nav>

        <div class="news-content-display">
            {#each data as d}
            <a href="{d.link}" class="hre" target="_blank" style="text-decoration: none; color: #000">
                <figure class="news-container">
                        <div class="_image_made_news">
                            <!-- <img src="../Media/neymar.jfif" alt="Neymar News"> -->
                            <img src="{d.photo_url}" alt="{d.source_name}">
                        </div>

                        <div class="display_news_info" style="margin: 10px;">
                            <h2>{d.title}</h2>
                            <p>{d.snippet ? d.snippet : ""}</p>
                        </div>

                        <div class="subtopics" style="margin: 10px;">
                            <br>
                            {#if d.sub_articles != (undefined || null)}
                                {#each d.sub_articles as vd, i}
                                    {#if vd.photo_url != (undefined || null)}
                                        <img src="{vd.photo_url}" alt="{vd.source_name}" style="width: 100px; height: 100px">
                                    {/if}
                                    <summary>{vd.title}</summary>
                                {/each}
                            {/if}
                        </div>
                </figure>
            </a>
            {/each}

            {#if newsNow} 
                {#each newsNow.news as d}
                <a href="{d.url}" class="hre" target="_blank" style="text-decoration: none; color: #000">
                    <figure class="news-container">
                            <div class="_image_made_news">
                                <!-- <img src="../Media/neymar.jfif" alt="Neymar News"> -->
                                <img src="{d.image}" alt="{d.source}">
                            </div>
    
                            <div class="display_news_info" style="margin: 10px;">
                                <h2>{d.title}</h2>
                                <p>{d.body ? d.body : ""}</p>
                            </div>

                    </figure>
                </a>
                {/each}
            {/if}
        </div>

        <div class="pagination_side"></div>
    </section>
</main>

<style scoped>
    @import "../app/app.min.css";
    @import "../shared.css";
</style>