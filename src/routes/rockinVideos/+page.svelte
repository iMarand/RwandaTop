<script>
    // @ts-nocheck

    // import highlights from "$lib/highlights_transfer_market_players_text.json";
    // import transfer from "$lib/transferNews.json";
    
    import videos from "$lib/Videos.min.json";
    var data = videos[0];

    console.log(data);

    var embedVideo = (e) => {

    }
</script>

<section class="headline-rep">
    <div class="news-headline-vpart">
        <h2 class="repre-rocknews">RockinNews Videos</h2>
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
                <p>Filter Videos</p>
                <button>Sport News</button>
                <button>Other Videos</button>
            </menu>

            <menu>
                <i class="bi bi-calendar-range-fill calender_news"></i>
            </menu>
        </nav>

        <a href="{data.url}" class="hre" target="_blank" style="text-decoration: none; color: #000; width: 100%">
            <div class="news-content-display">
                <figure class="news-container">
                    <div class="embeded">
                        <img src="../Media/basket.jfif" alt="RockinNews Content_" class="emImage">
                        <div class="isTitleVid">
                            <p class="isTitle">{data.competition.name}</p>
                            <span>{data.title}</span>

                            <a class="visitVideoSource" href="{data.url}">visit - {data.url}</a>
                        </div>
                    </div>
                </figure>
            </div>
        </a>
    </section>
</main>

<style>
    @import "../shared.css";
    .news-container {
        height: fit-content;
    }
    .embeded {
        width: 100%;
        height: 300px;
        padding: 3px;
        overflow: hidden;
    }

    .embeded img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
    }

    .isTitle {
        font-family: 'Poppins-Regular';
    }

    .isTitleVid {
        background-color: rgba(46, 46, 46, 0.486);
        translate: 0 calc(100% - 183px);
        width: 100%;
        height: 30%;
        border-radius: 0 0 8px 8px;
        color: #fff;
        display: flex;
        flex-flow: column;
        padding: 10px;
    }

    .visitVideoSource {
        color: #fff;
        text-decoration: none;
        font-size: 12px;
        max-width: 300px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        align-self: self-end;
    }
    
</style>

