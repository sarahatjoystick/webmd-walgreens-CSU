var gallery = [];
var currentSlide = 0;
var version = '1.1';
var firstTime = true;
var videoTabActive = false;
var activeButtons = true;
var videoVirgin = true;
var userZip = '10011';
var peeked;
var zipCenter;
var ftkey = 'AIzaSyD5BTFfjgxluZ1J9UaFg_68TJcmNA2JHfo';
//var ftkey = 'AIzaSyBT3jS9U4zUtcjZ6g3awQpMB8Jd1HAYEpg';
var isMapCreated = false;
var circleRef = new google.maps.Circle();

var videoended = false;
var fquart = false;
var squart = false;
var tquart = false;

function init() {
    
    var nua = navigator.userAgent;
   
    if (nua.indexOf('MSIE') > 0) {
        if (nua.indexOf('10') > 0 || nua.indexOf('11') > 0) {
            adSupported();
        } else {
            backup();
        }
    }
    else
    {
        adSupported();
    }
}

function adSupported()
{
    if(console) console.log('[Studio Enabler] Callback set to: init()\n\t\t\t\t Common methods: Enabler.exitoverride(ID, URL), Enabler.counter(ID, true)\n\t\t\t\t Custom methods: loadVideoMetrics(), getURL(URL)');
    startAD();
}

function startAD() {

    trace(version);
    gallery = config.module.gallery.photos;

    if(Enabler.getUserZipCode())
    {
        trace('Studio Locaton detected');
        userZip = Enabler.getUserZipCode();
        prePreload();
    }
    else
    {
        trace('no zip');
        prePreload();
    }
}

function prePreload() {
    trace('prepreload');
    preload([
        getURL(config.intro),
        getURL(config.header.image),
        getURL(config.footer.image),
        getURL(config.module.bg)
    ], adStart);
}

function adStart() {

    trace('adstart');
    Enabler.addEventListener(studio.events.StudioEvent.EXIT, function(){
        if(videoTabActive) toggleVideoTab(0);
    });

    trace('start listeners');
    // PRELIMINARY LISTENERS
    document.getElementById('header').onclick = buttonHandler;
    document.getElementById('backup').onclick = buttonHandler;
    document.getElementById('buy-now').onclick = buttonHandler;
    document.getElementById('header_locator').onclick = buttonHandler;
    document.getElementById('header_gallery').onclick = buttonHandler;
    document.getElementById('header_video').onclick = buttonHandler;
    document.getElementById('footer').onclick = buttonHandler;
    document.getElementById('video_cta').onclick = buttonHandler;
    document.getElementById('mod_gallery').onclick = buttonHandler;
    document.getElementById('mod_locator').onclick = buttonHandler;
    document.getElementById('zip_field').onclick = buttonHandler;
    document.getElementById('btn_zip').onclick = buttonHandler;
    document.getElementById('btn_zip2').onclick = buttonHandler;
    document.getElementById('btn_prev').onclick = buttonHandler;
    document.getElementById('btn_next').onclick = buttonHandler;
    document.getElementById('close_gallery').onclick = buttonHandler;
    document.getElementById('close_locator').onclick = buttonHandler;
    document.getElementById('close_video').onclick = buttonHandler;
    document.getElementById('toggleList').onclick = buttonHandler;
    document.getElementById('toggleMap').onclick = buttonHandler;
    document.getElementById('watch_btn_video').onclick = buttonHandler;

    // LOAD IMAGES
    trace('start load images');

    document.getElementById('container').style.opacity = 1;

    document.getElementById('backup').src = getURL(config.intro);
    document.getElementById('header').src = getURL(config.header.image);
    document.getElementById('footer').src = getURL(config.footer.image);
    document.getElementById('watch_btn_video').src = getURL(config.module.watchMore);

    document.getElementById('btnList').src = getURL(config.module.listOff);
    document.getElementById('btnMap').src = getURL(config.module.mapOn);

    document.getElementById('tab_gallerybg').src = getURL(config.module.bg);
    document.getElementById('tab_videobg').src = getURL(config.module.bg);
    document.getElementById('tab_locatorbg').src = getURL(config.module.bg);
    //document.getElementById('close_gallery').src = getURL(config.module.close);
    //document.getElementById('close_video').src = getURL(config.module.close);

    //document.getElementById('locator_posterimg').src = getURL('https://maps.googleapis.com/maps/api/staticmap?center='+userZip+'&zoom=8&size=290x230');
    document.getElementById('locator_posterimg').src = getURL('https://maps.googleapis.com/maps/api/staticmap?center='+userZip+'&zoom=8&size=290x128');
    document.getElementById('tab_locatorimg').src = getURL('https://maps.googleapis.com/maps/api/staticmap?center='+userZip+'&zoom=8&size=300x500');
    document.getElementById('btn_zip').src = getURL(config.module.locator.button);
    document.getElementById('btn_zip2').src = getURL(config.module.locator.button);
    //document.getElementById('btn_zip').src = getURL(config.module.locator.button);

    document.getElementById('gallery_posterimg').src = getURL(config.module.gallery.poster);
    document.getElementById('video_smallposter').src = getURL(config.module.video.poster.small);

    // INTRO ANIMATION (?)
    trace('intro animation');

    setTimeout(function(){
        removeClass(document.getElementById('header'), 'start');

    }, 1000);

    setTimeout(function(){
        removeClass(document.getElementById('subcontainer'), 'start');

    }, 1800);

    toggleSpinner(0);
    setVideo();

    peeked = 0;

    setTimeout(triggerAP, 3000);

}

function triggerAP()
{
    document.getElementById('loader').style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    if(peeked >= 2)
    {
        //autoGallery();
    }
    else
    {
        autoPeek(document.getElementById('mod_gallery'), 'mod_active', 100);
        autoPeek(document.getElementById('mod_locator'), 'mod_active', 2000);
        setTimeout(triggerAP, 6000);
        peeked++;
    }
}

function autoPeek(obj, cl, num)
{
    var wrapper = obj.getElementsByClassName('animate')[0];

    setTimeout(function(){

        addClass(wrapper, cl)

        setTimeout(function(){
            if(!video.ismobile)
            removeClass(wrapper, cl);
        }, 1000)
    }, num)
}

function buttonHandler(e)
{
    //trace(e.currentTarget.id);
    switch(e.currentTarget.id)
    {
        case "buy-now":
            trace('--- buy-now exit');
            Enabler.exit('CTA_BUY_NOW_CLICK');
        break;
        case "header":
            trace('--- header exit');
            Enabler.exit('HEADER_CLICK');
        break;
        case "header_gallery":
            trace('--- header exit');
            Enabler.exit('HEADER_CLICK');
        break;
        case "header_locator":
            trace('--- header exit');
            Enabler.exit('HEADER_CLICK');
        break;
        case "header_video":
            trace('--- header exit');
            Enabler.exit('HEADER_CLICK');
        break;
        case "footer":
            trace('--- footer exit');
            Enabler.exit('FOOTER_CLICK');
        break;
        case "learnMore0":
            trace('--- learnMore0 exit');
            Enabler.exit('CTA_LEARNMORE_S1_CLICK');
        break;
        case "learnMore1":
            trace('--- learnMore2 exit');
            Enabler.exit('CTA_LEARNMORE_S2_CLICK');
        break;
        case "learnMore2":
            trace('--- learnMore2 exit');
            Enabler.exit('CTA_LEARNMORE_S3_CLICK');
        break;
        case "watch_btn_video":
            trace('--- video-cta exit');
            Enabler.exit('CTA_VIDEO_LEARN_HOW_CLICK');
        break;
        case "video_cta":
            toggleVideoTab(1);
            Enabler.counter('VIDEO_OPEN');
        break;
        case "mod_gallery":
            toggleGallery(1);
            Enabler.counter('GALLERY_OPEN');
        break;
        case "mod_locator":
            toggleLocator(1);
            Enabler.counter('LOCATOR_OPEN');
        break;
        case "close_locator":
            toggleLocator(0);
            Enabler.counter('LOCATOR_CLOSE');
        break;
        case "close_gallery":
            toggleGallery(0);
            Enabler.counter('GALLERY_CLOSE');
        break;
        case "close_video":
            toggleVideoTab(0);
            Enabler.counter('VIDEO_CLOSE');
        break;
        case "btn_prev":
            if(currentSlide > 0 && activeButtons)
            {
                addClass(document.getElementById('btn_prev'), 'disabled');
                addClass(document.getElementById('btn_next'), 'disabled');

                toggleSpinner(1);
                preload([getURL(config.module.gallery.photos[currentSlide-1][0])], function(){
                    toggleSpinner(0);
                    loadSlide(currentSlide-1);
                });

                Enabler.counter('GALLERY_INTERACTIONS', true);
                Enabler.counter('GALLERY_PREVIOUS');
            }
        break;
        case "btn_next":
            if(currentSlide < gallery.length-1 && activeButtons)
            {
                addClass(document.getElementById('btn_prev'), 'disabled');
                addClass(document.getElementById('btn_next'), 'disabled');

                toggleSpinner(1);
                preload([getURL(config.module.gallery.photos[currentSlide+1][0])], function(){
                    toggleSpinner(0);
                    loadSlide(currentSlide+1);
                });

                Enabler.counter('GALLERY_INTERACTIONS', true);
                Enabler.counter('GALLERY_NEXT');
            }
        break;
        case "zip_field":
            if(document.getElementById('zip_field').value == "ZIP code") document.getElementById('zip_field').value = '';
            addClass(document.getElementById('zip_field'), 'zip_active')
        break;
        case "zip_field2":
            if(document.getElementById('zip_field2').value == "ZIP code") document.getElementById('zip_field2').value = '';
            addClass(document.getElementById('zip_field2'), 'zip_active')
        break;
        case "btn_zip":
            if( document.getElementById('zip_field').value.length && document.getElementById('zip_field').value != "ZIP code")
            {
                userZip = document.getElementById('zip_field').value;
                document.getElementById('zip_field2').value = document.getElementById('zip_field').value;
                addClass(document.getElementById('zip_field2'), 'zip_active');
                Enabler.counter('LOCATOR_INTERACTIONS', true);
                Enabler.counter('LOCATOR_ZIP');
                loadLocationList();
            }
        break;
        case "btn_zip2":
            if( document.getElementById('zip_field2').value.length && document.getElementById('zip_field2').value != "ZIP code")
            {

                userZip = document.getElementById('zip_field2').value;
                Enabler.counter('LOCATOR_INTERACTIONS', true);
                Enabler.counter('LOCATOR_ZIP');
                loadLocationList();
            }

        break;
        case "toggleList":
            Enabler.counter('LOCATOR_INTERACTIONS', true);
            Enabler.counter('LOCATOR_TOGGLE_LIST');
            toggleSecondaryLocator(2);
        break;
        case "toggleMap":
            Enabler.counter('LOCATOR_INTERACTIONS', true);
            Enabler.counter('LOCATOR_TOGGLE_MAP');
            toggleSecondaryLocator(1);
        break;
        case "backup":
            Enabler.exit('BACKGROUND_CLICK');
        break;
        default:
            Enabler.exitOverride('HEADER_CLICK', config.header.exit);
    }
}

function loadmap(loc, callback)
{
    if(!map)
    {
        gmap.locate.find(loc, function(e) {
            zipCenter = e;
            document.getElementById('map_locations').innerHTML = '';
            gmap.init({id: 'map_locations', zoom: 8, center: e}, callback);
        });
    }
    else
        if(callback) callback();
}



function loadLocationList(num)
{
    locations = [];

    toggleSpinner(1);

    geocoder.geocode({
        address: userZip
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // OPTIONAL: run spatial query to find results within bounds.
            var resultLoc = results[0].geometry.location;
            var nearLat = resultLoc.lat();
            var nearLng = resultLoc.lng();
            //var order = 'ST_DISTANCE(' + 'faddress' + ', LATLNG(' + nearLat + ', ' + nearLng +'))';
            var where = 'ST_INTERSECTS(' + 'faddress' + ',CIRCLE(LATLNG(' + nearLat + ',' + nearLng +'),32000))';

            var limit = 30;

            var xmlhttp = new XMLHttpRequest();
            var url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20name%2Cfaddress%2Clat%2Clng%2Czip%20' +
                //'FROM%2014jHG4cgOylY4fEJUgSSeMNzMCYGv5uTabHEIDLG1%20ORDER%20BY%20' + where + '%20LIMIT%20' + limit +
                //'FROM%201LPhq5V2k8QFAw48nDfEhGUmLNg5hsXHJLdyoSdyb%20WHERE%20' + where + '%20LIMIT%20' + limit +
                'FROM%201LPhq5V2k8QFAw48nDfEhGUmLNg5hsXHJLdyoSdyb%20WHERE%20' + where +
                '&key=' + ftkey;

            xmlhttp.onload = function() {
                if (xmlhttp.status === 200) {
                     // Create a map circle object to visually show the radius.
                    /*circleRef.setMap(null);
                    circleRef = new google.maps.Circle({
                      center: new google.maps.LatLng(nearLat, nearLng),
                      radius: 32000,
                      map: map,
                      fillOpacity: 0.2,
                      strokeOpacity: 0.0,
                      strokeWeight: 0
                    });*/
                    toggleSpinner(0);
                
                    if (JSON.parse(xmlhttp.response).rows) {
                        console.log(JSON.parse(xmlhttp.responseText));     

                        document.getElementById('map_listings').innerHTML = '';

                        gmap.marker.clear();

                        var parent = document.getElementById('map_listings');
                        var wrapper = document.createElement('div');
                            wrapper.style.top = 0;
                            wrapper.style.zIndex = 90;
                            wrapper.style.backgroundColor = '#FFF';
                            wrapper.id = 'locationList';

                        var arr = JSON.parse(xmlhttp.responseText).rows;

                        arr.forEach(function(entry) {
                            gmap.getDistance(results[0].geometry.location, new google.maps.LatLng(entry[2], entry[3]), function(e){
                                if(isNaN(e))
                                    entry[5] = 100; // failsafe if NaN; far away distance 100; no geocode;
                                else
                                    entry[5] = e;
                            });
                            ++i;
                        });

                        var retrieved = arr.length;

                        if(retrieved > 40){
                            retrieved = 40;
                        }

                        // sort the 5th key of each array which is distance;
                        arr = arr.sort(function(a, b){
                          return a[5] - b[5];
                        });

                        for(var i = 0; i < retrieved; i++)
                        {
                            var tobj = {}
                                tobj.id = i;
                                tobj.name = arr[i][0];
                                tobj.address = arr[i][1];
                                tobj.lat = arr[i][2];
                                tobj.lng = arr[i][3];
                                tobj.loc = null;
                                locations.push(tobj);
                                
                            var li = document.createElement('div');
                                li.className = 'btn cell'
                                li.id = 'location'+tobj.id;
                                li.onclick = findMarker
                                    
                            var s1 = document.createElement('div');
                                s1.className = 'name';
                                s1.innerHTML = tobj.name;

                            var s2 = document.createElement('div');
                                s2.className = 'address';
                                s2.innerHTML = tobj.address;

                            li.appendChild(s1);
                            li.appendChild(s2);

                            wrapper.appendChild(li);

                            if(typeof tobj.lat === 'number' && typeof tobj.lng === 'number'){
                                var e = new google.maps.LatLng(tobj.lat, tobj.lng);
                                locations[tobj.id].loc = e;
                                locations[tobj.id].info = '<div style="overflow: hidden !important; line-height: 18px;"><b>' + tobj.name + '</b><br>' + tobj.address + '</div>';

                                gmap.marker.add(locations[tobj.id]);

                                gmap.fit();
                            }else{
                                // backup; if no lat/lng is provided
                                gmap.locate.find(tobj.address, function(e, a){  
                                    console.log(e);
                                    locations[tobj.id].loc = e;
                                    locations[tobj.id].info = a;

                                    gmap.marker.add(locations[tobj.id]);

                                    gmap.fit();
                                    //gmap.zoom(8);
                                }, '<div style="overflow: hidden !important;"><b>' + tobj.name + '</b><br>' + tobj.address + '</div>');
                            }

                        }
                        gmap.fitBound(gmap.marker.list.markers);
                        //setTimeout(gmap.fit, 1000);
                        //trace(locations);
                        console.log(map.getZoom() + ' <<< ZOOM');
                        parent.appendChild(wrapper);
                        toggleSecondaryLocator(2);

                    }else{
                        alert('No locations at zipcode '+userZip);
                    }
                }
            };
            trace('--- OPEN');
            trace('--- ' + url);
            xmlhttp.open('GET', url, true);
            trace('--- SEND');
            trace('--- ' + userZip);
            xmlhttp.send();
        }else{
            toggleSpinner(0);
            alert('Please enter a valid Zip Code');
        }
    });

}

function findMarker(e) {
    Enabler.counter('LOCATOR_INTERACTIONS', true);
    Enabler.counter('LOCATOR_FIND_MARKER');

    var obj = locations[Number(e.currentTarget.id.substring(8))];
    
    trace(obj);

    if(obj.loc)
    {
        //trace('location data exists');
        gmap.center(obj.loc, true);
        gmap.zoom(15);
    }
    else
    {
        gmap.locate.find(obj.address, function(e){
            trace(e);
            var tobj = { loc: e };
            gmap.center(tobj.loc, true);
            gmap.zoom(15);
        });
    }

    toggleSecondaryLocator(1);
}

function toggleGallery(bool)
{
    if(bool)
    {
        toggleSpinner(1);

        preload([getURL(config.module.gallery.photos[0][0])], function(){
            toggleSpinner(0);
            addClass(document.getElementById('tab_gallery'), 'tabactive');
            loadSlide(0, true);
        });
    }
    else
    {
        removeClass(document.getElementById('tab_gallery'), 'tabactive');
        setTimeout(function(){
            document.getElementById('slides').innerHTML = "";
        }, 500);

    }
}

function closeColor(color){
    var cbtns = document.getElementsByClassName('close_tab');

    for(var i = 0; i < cbtns.length; i++)
    {
        cbtns[i].style.color = color;
    }
}

/*function toggleSecondaryLocator(num)
{
    if(num)
    {
        document.getElementById('secondary_content').style.visibility = 'visible';
    }
    else
    {
        document.getElementById('secondary_content').style.visibility = 'hidden';
    }

}*/

function toggleSecondaryLocator(num)
{
    switch(num)
    {
        case 1:
            document.getElementById('secondary_content').style.visibility = 'visible';
            document.getElementById('locator_bgscreen').style.opacity = 0;
            document.getElementById('map_listings').style.visibility = 'hidden';
            document.getElementById('map_listings').style.overflow = 'hidden';
            document.getElementById('map_locations').style.visibility = 'visible';
            document.getElementById('btnList').src = getURL(config.module.listOff);
            document.getElementById('btnMap').src = getURL(config.module.mapOn);
            
        break;
        case 2:
            document.getElementById('secondary_content').style.visibility = 'visible';
            document.getElementById('locator_bgscreen').style.opacity = 0;
            document.getElementById('map_listings').style.visibility = 'visible';
            document.getElementById('map_listings').style.overflow = 'auto';
            document.getElementById('map_locations').style.visibility = 'hidden';
            document.getElementById('btnList').src = getURL(config.module.listOn);
            document.getElementById('btnMap').src = getURL(config.module.mapOff);
        break;
        default:
            document.getElementById('secondary_content').style.visibility = 'hidden';
            document.getElementById('locator_bgscreen').style.opacity = 1;
            document.getElementById('map_listings').style.overflow = 'hidden';
            document.getElementById('map_listings').style.visibility = 'hidden';
            document.getElementById('map_locations').style.visibility = 'hidden';
            document.getElementById('btnList').src = getURL(config.module.listOff);
            document.getElementById('btnMap').src = getURL(config.module.mapOn);
    }
}

function toggleLocator(bool)
{
    var cbtns = document.getElementsByClassName('close_tab_locator');

    // FROM w.diaz code sample
    // MAP
    var defaultCenter = new google.maps.LatLng(40.7127837, -74.00594130000002);
    var defaultZoom = 8;

    map = new google.maps.Map(document.getElementById('map_locations'), {
        center: defaultCenter,
        zoom: defaultZoom,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListener(map, 'tilesloaded', function(evt) {
        if(!isMapCreated) {
            geocoder = new google.maps.Geocoder();

            /*layer = new google.maps.FusionTablesLayer({
                query: {
                    select: 'faddress',
                    //from: '14jHG4cgOylY4fEJUgSSeMNzMCYGv5uTabHEIDLG1'
                    from: '1LPhq5V2k8QFAw48nDfEhGUmLNg5hsXHJLdyoSdyb'
                },
                suppressInfoWindows: true,
                map: map
            });*/
        }
        isMapCreated = true;
    });

    // END w.diaz sample code

    for(var i = 0; i < cbtns.length; i++)
    {
        cbtns[i].style.color = config.module.close_color_locator;
    }

    if(bool)
    {
        addClass(document.getElementById('tab_locator'), 'tabactive');
        toggleSecondaryLocator(0);
    }
    else
    {
        removeClass(document.getElementById('tab_locator'), 'tabactive');
        gmap.marker.clear();
    }
}

function toggleVideoTab(bool)
{
    if(bool)
    {
        if(!videoTabActive)
        {
            //toggleSpinner(1);

            //preload([getURL(config.module.bg)], function() {

                videoTabActive = true;

                //toggleSpinner(0);

                document.getElementById('video_title').innerHTML = config.module.video.title;
                document.getElementById('video_info').innerHTML = config.module.video.description;

                if(!video.ismobile)
                {
                    video.obliterate();
                    video.init('video_bigcontainer');
                    video.load(getURL(config.module.video.files), getURL(config.module.video.poster.big));
                }
                else
                {
                    video.play();
                }


                addClass(document.getElementById('tab_video'), 'tabactive');
            //});
        }
    }
    else
    {
        if(videoTabActive)
        {

            //if(!video.ismobile) toggleVideoCTA(0);
            //toggleVideoCTA(1);

            videoTabActive = false;
            removeClass(document.getElementById('tab_video'), 'tabactive');

            if(!video.ismobile)
            {
                video.obliterate();
                toggleVideoSmallPoster(1);
                video.init('video_smallcontainer');
                video.load(getURL(config.module.video.files), getURL(config.module.video.poster.big));
            }
            else
            {
                video.stop();
            }
        }
    }
}

function setVideo()
{
    // VIDEO STUFF

    video.userAgent();

    //video.debug = true;
    //video.ismobile = true;
    //video.startmuted = true;
    //video.replaywithsound = true;
    video.uniquereplay = false;

    video.dom.template.bigplay = function() {
        video.dom.bigplay = document.createElement('span');
        //video.dom.bigplay.className = 'icon-play2';
        video.dom.bigplay.className = 'fa fa-play-circle-o';
        video.dom.bigplay.style.color = video.colors.play_pause;
        video.dom.bigplay.style.fontSize = 50 + 'px';
        //video.dom.bigplay.innerHTML = '&#xea15;';
        video.trace('using new play');
    }

    if(!video.ismobile)
    {
       video.autoplay = true;
       //toggleVideoCTA(0);
    }
    else
    {
        video.autoplay = false;
        //toggleVideoCTA(1);
    }
    //video.allowfullscreen = true;

    video.callback.ready = function() {
        if(video.dom.container.id === 'video_smallcontainer'){
            Enabler.counter('AUTOVIDEO_STARTS');
        }else{
            Enabler.counter('VIDEO_STARTS', true);
            videoended = false;
        }
        
    }

    video.callback.ended = function() {
        if(videoTabActive)
        {
            Enabler.counter('VIDEO_ENDS', true);
            videoended = true;
            toggleVideoSmallPoster(1);
        }
    }
    video.callback.pause = function() {
        if(videoTabActive)
        {
            Enabler.counter('VIDEO_PAUSE');
        }
    }
    video.callback.volumechange = function() {
        if(videoTabActive)
        {
            if(video.isMuted()){
                Enabler.counter('VIDEO_MUTE');
            }else{
                Enabler.counter('VIDEO_UNMUTE');
            }
        }
    }
    video.callback.play = function() {
        if(!videoTabActive && video.autoplay)
        {
            video.mute();
            toggleVideoSmallPoster(0);
        }else{
            if(videoended){
                fquart = false;
                squart = false;
                tquart = false;
                Enabler.counter('VIDEO_REPLAY');
                Enabler.counter('VIDEO_STARTS', true);
                videoended = false;
            }else{
                Enabler.counter('VIDEO_PLAY');
            }
        }
    }

    video.callback.progress = function() {
        if(!videoTabActive)
        {
            document.getElementById('v_controls').style.opacity = 0;
            if(video.playhead >= 10)
            {
                Enabler.counter('AUTOVIDEO_ENDS');
                video.stop();
                toggleVideoSmallPoster(1);
            }
        }else{
            var q2 = video.duration / 2;
            var q1 = q2 / 2;
            var q3 = q2 + (q2 / 2);
            if(!fquart && (video.playhead > q1)){
                Enabler.counter('VIDEO_FIRST_QUARTILE');
                fquart = true;
            }
            if(!squart && (video.playhead > q2)){
                Enabler.counter('VIDEO_SECOND_QUARTILE');
                squart = true;
            }
            if(!tquart && (video.playhead > q3)){
                Enabler.counter('VIDEO_THIRD_QUARTILE');
                tquart = true;
            }
        }

    }

    if(!video.ismobile)
        video.init('video_smallcontainer');
    else
        video.init('video_bigcontainer');

    video.load(getURL(config.module.video.files), getURL(config.module.video.poster.big));
}

/*
function toggleVideoCTA(bool)
{
    if(bool)
        document.getElementById('video_cta').style.opacity = 1;
    else
        document.getElementById('video_cta').style.opacity = 0;

}
*/
function toggleVideoSmallPoster(bool)
{
    if(bool)
        document.getElementById('video_smallposter').style.opacity = 1;
    else
        document.getElementById('video_smallposter').style.opacity = 0;

}

function toggleSpinner(bool)
{
    if(bool)
    {
        document.getElementById('loader').style.visibility = 'visible';
        addClass(document.getElementById('loader'), 'loader_active');
    }
    else
    {
        removeClass(document.getElementById('loader'), 'loader_active');
        setTimeout(function(){
            document.getElementById('loader').style.visibility = 'hidden';
        }, 500)
    }
}

function loadSlide(num, bool)
{

    activeButtons = false;

    if(num != currentSlide || bool)
    {

        var classfrom;
        var oldSlide;

        if(num > currentSlide)
        {
            classfrom = 'slide_left';
        }
        else
        {
            classfrom = 'slide_right';
        }

        if(bool)
        {
            classfrom = null;
            addClass(document.getElementById('btn_prev'), 'disabled');
        }
        else
            oldSlide = document.getElementById('slide_'+currentSlide);

        //if(oldSlide) addClass(oldSlide, 'forcetop');

        currentSlide = num;

        var parent = document.getElementById('slides');

        var slide = document.createElement('div');
            slide.id = 'slide_'+currentSlide;
            slide.className = 'slide abs animate';
            //if(!bool) addClass(slide, classfrom);
            slide.style.backgroundImage = "url("+getURL(config.module.bg)+")";
            slide.style.backgroundPosition = '0 -68px';

        var img = document.createElement('img');
            img.src = getURL(config.module.gallery.photos[currentSlide][0]);
            slide.appendChild(img);

        var index = document.createElement('div');
            index.innerHTML = "slide "+( currentSlide+1 )+"/"+config.module.gallery.photos.length;
            index.className = 'text_slide abs';
            slide.appendChild(index);

        var wrapper = document.createElement('div');
            wrapper.className = 'slide_infowrapper abs';
            slide.appendChild(wrapper);

        var title = document.createElement('div');
            title.className = 'text_title rel lato';
            title.innerHTML = config.module.gallery.photos[currentSlide][1];
            wrapper.appendChild(title);

        var info = document.createElement('div');
            info.className = 'text_info rel lato';
            info.innerHTML = config.module.gallery.photos[currentSlide][2];
            wrapper.appendChild(info);

        var learnMore = document.createElement('img');
            learnMore.className = 'abs btn learn_more_gallery';
            learnMore.id = 'learnMore' + currentSlide;
            learnMore.src = config.module.watchMore;
            wrapper.appendChild(learnMore);

        /*var attr = document.createElement('ul');
            attr.className = 'text_attr rel lato';
            //attr.innerHTML = config.module.gallery.photos[currentSlide][3];
            wrapper.appendChild(attr);*/

        var li = document.createElement('div');
            if(config.module.gallery.photos[currentSlide][3] != undefined){
              li.className = 'text_attr rel lato';
              li.innerHTML = config.module.gallery.photos[currentSlide][3];
              wrapper.appendChild(li);
            }

            slides.appendChild(slide);

        document.getElementById(learnMore.id).onclick = null;
        document.getElementById(learnMore.id).onclick = buttonHandler;

        setTimeout(function(){
            if(oldSlide) addClass(oldSlide, classfrom);
        }, 100);

        setTimeout(function(){
            removeClass(document.getElementById('btn_prev'), 'disabled');
            removeClass(document.getElementById('btn_next'), 'disabled');

            if(oldSlide)
            {
                removeClass(oldSlide, 'forcetop');
                oldSlide.parentNode.removeChild(oldSlide);
            }

            addClass(slide, 'forcetop');

            if(currentSlide === 0)
                addClass(document.getElementById('btn_prev'), 'disabled');

            if(currentSlide === gallery.length-1)
                addClass(document.getElementById('btn_next'), 'disabled');

            activeButtons = true;

        }, 500);

    }

}

// MINI GALLERY

var galleryTimer;
var gIndex = 0;
var galleryLen;

if(config.module.gallery.photos.length < 3)
    galleryLen = config.module.gallery.photos.length;
else
    galleryLen = 3;

function autoGallery()
{
    if(config.module.gallery.photos)
    {
        galleryTimer = setTimeout(function(){
            clearTimeout(galleryTimer);

            preload([config.module.gallery.photos[gIndex][0]], function(){
                var el = document.createElement('img');
                    el.className = 'abs animate mslide';
                    el.style.opacity = 0;
                    el.src = config.module.gallery.photos[gIndex][0];
                    document.getElementById('mini-slideshow').appendChild(el);

                    el.style.top = ( ( (el.offsetHeight - document.getElementById('mod_gallery').offsetHeight ) / 2 ) * -1 )+ 'px'

                setTimeout(function(){
                    el.style.opacity = 1;
                }, 50);

                gIndex++;

                if(gIndex < galleryLen)
                    setTimeout(autoGallery, 800);
                else
                    setTimeout(function(){
                        document.getElementById('mini-slideshow').style.opacity = 0;
                        setTimeout(function(){
                            document.getElementById('mini-slideshow').parentNode.removeChild(document.getElementById('mini-slideshow'));
                        }, 1000);
                    }, 3000);
            })
        }, 3000);
    }
    else
        trace('no photos');
}


