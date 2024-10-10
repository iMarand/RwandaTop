
// @ts-nocheck

String.prototype.query = function(x) {
    return x == "all" ? 
        document.querySelectorAll(this) : 
        document.querySelector(this);
}

var  o = new Object({
    matches_events: function() {
        var b_upcome = "#btn-upcoming".query('');
        
        return b_upcome;
    }
})

export function Main_Events_DOM() {
    return o;
}

