
<script>
    import { onMount } from "svelte";

    onMount(() => {
        document.body.style = "overflow: hidden; background: #27262914";
    })
</script>

<main class="app-container">
    <h3>Visit Our Whole Channels on different Social Media</h3>
    <p>Stay tunned with your favorite matches and stay in touch with us</p>

    <div class="main-entry-channel">
        <form class="sub-form">
            <h4>Subscribe To Get Updates</h4>
            <p>Enter Email</p>
            <input type="text" id="Email-Channel" placeholder="Enter Your Email">
            <button>Subscribe</button>
        </form>

        <div class="splashDisplay">
            <img src="../Media/splash_1.png" alt="">
        </div>
    </div>
</main>

<footer style="">
    <figure>
        <img src="../Media/instagram_1.png" alt="yewe" style="">
    </figure>

    <figure>
        <img src="../Media/facebook_1.png" alt="">
    </figure>

    <figure>
        <img src="../Media/whatsapp_1.png" alt="">
    </figure>

    <figure>
        <img src="../Media/twitter_1.png" alt="">
    </figure>
</footer>

<style scoped>
    footer {
        background-color: #222;
        width: 100%; height: 10em; 
        position: sticky; 
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-flow: row;
        border-top: 3px solid var(--app-fore-color);
    }

    footer img {
        width: 8em;
        height: 8em;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 1px 10px 10px 1px #222c;
        transition: all 0.3 ease;
    }
    footer img:hover {
        scale: 1.1;
        transition: all 0.3 ease;
    }

    .main-entry-channel {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        margin-top: 60px;
    }

    .splashDisplay img {
        width: 30em;
        height: 28em;
        object-fit: scale-down;
        translate: 40px -150px;
        backdrop-filter: blur(10px);
    }
    .sub-form {
        display: flex;
        flex-flow: column;
    }

    .sub-form h4 {
        font-size: 25px;
    }

    .sub-form button {
        width: 150px;
        height: 40px;
        padding: 10px;
        outline: none;
        border: 0 solid;
        border-radius: 4px;
        font-size: 18px;
        background-color: var(--app-fore-color);
        color: #fff
    }

    #Email-Channel {
        width: 40em;
        height: 40px;
        outline: none;
        border: 0 solid;
        border-radius: 4px;
        background-color: rgba(107, 105, 105, 0.274);
        margin: 20px 0 10px 0;
        padding: 10px;
    }
    
    @media (max-width: 880px) {
        #Email-Channel {
            background-color: red;
        }
    }
</style>