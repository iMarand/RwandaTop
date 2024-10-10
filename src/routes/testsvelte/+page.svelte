
<script>
    // @ts-nocheck
    let batteryLevel;
    function getBatteryDetails() {
        navigator.getBattery().then((battery) => {
            batteryLevel = battery.level * 100;
            battery.addEventListener('levelchange', getBatteryDetails);
        });
    }
</script>
<main use:getBatteryDetails>
    <p>Battery Level is {batteryLevel}</p>
</main>

<script context="module">
   
    // console.log(navigator)
</script>