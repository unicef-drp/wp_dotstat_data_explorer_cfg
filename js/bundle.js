function checkBrowser() {
    var ES6_Error = false;

    function check() {
        "use strict";

        if (typeof Symbol == "undefined") return false;
        try {
            eval("class A {}");
            eval("var B = (x) => x+1");
        } catch (e) {
            return false;
        }

        return true;
    }
    // The engine supports ES6 features you want to use
    if (!check()) {
        ES6_Error = true;
        document.getElementById('main').style.display = "none";
        document.getElementById('mainUpdateBrowser').style.display = "";
        return false;
    }
    return true;
}

const pathjoin = (parts, sep) => {
    var separator = sep || '/';
    var replace = new RegExp(separator + '{1,}', 'g');
    return parts.join(separator).replace(replace, separator);

}

function loadJson(url, onsuccess) {
    var xmlhttp = new XMLHttpRequest();
    /*xmlhttp.setRequestHeader("Accept", 'application/json');
    xmlhttp.withCredentials=true;*/

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                onsuccess(data);
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function addReactScripts(de_cfg, remotePath, ver) {
    DATAFLOW = de_cfg.DATAFLOW;
    SETTINGS.sdmx.datasources = de_cfg.SETTINGS_override;
    SETTINGS.unicef = de_cfg.unicef_settings;
    SETTINGS.hierarchy = de_cfg.HIERARCHY_override;
    SETTINGS.map = de_cfg.map_settings;

    var basepath = "/de/static/js/";
    var to_add = ["bundle.js", "2.chunk.js", "main.chunk.js"];
    for (var i = 0; i < to_add.length; i++) {
        var node = document.createElement('script')
        node.setAttribute('src', remotePath + basepath + to_add[i] + "?v=" + ver);
        document.body.appendChild(node);
    }
}

function addHelpBox(helpUrl) {

    if (helpUrl && helpUrl.trim() != "") {
        var helpDiv = document.createElement("div");
        helpDiv.id = "div_de_help";
        helpDiv.classList.add("pull-right");

        var closebtnDiv = document.createElement("div");
        closebtnDiv.classList.add("closebtn");
        closebtnDiv.onclick = function () { document.getElementById('div_de_help').style.display = 'none'; }
        closebtn_icon = document.createElement("span");
        closebtn_icon.classList.add("pt-icon-standard");
        closebtn_icon.classList.add("pt-icon-cross");

        closebtnDiv.appendChild(closebtn_icon);
        helpDiv.appendChild(closebtnDiv);

        var lnk1 = document.createElement("a");
        lnk1.href = helpUrl;
        lnk1.appendChild(document.createElement("span"));
        lnk1.getElementsByTagName("span")[0].classList.add("pt-icon-standard");
        lnk1.getElementsByTagName("span")[0].classList.add("pt-icon-help");

        var lnk2 = document.createElement("a");
        lnk2.href = helpUrl;
        lnk2.appendChild(document.createElement("span"));
        lnk2.appendChild(document.createElement("span"));
        lnk2.getElementsByTagName("span")[0].classList.add("help_text");
        lnk2.getElementsByTagName("span")[0].innerText = "Need help using this tool?"
        lnk2.getElementsByTagName("span")[1].classList.add("help_text_small");
        lnk2.getElementsByTagName("span")[1].innerText = "Help"

        helpDiv.appendChild(lnk1);
        helpDiv.appendChild(lnk2);

        document.body.appendChild(helpDiv);

        //Hide on scroll
        document.addEventListener('scroll', function(e){
            if (window.scrollY>0){
                document.getElementById("div_de_help").style.display="none";
            }
            else{
                document.getElementById("div_de_help").style.display="block";
            }
        })
    }
}
function addScript(src, callback) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = callback;
    document.body.appendChild(s);
}
function addResources(remote_files_path, version) {
    var to_add_css = [
        "/css/data_explorer.css",
        "/de/static/css/main.chunk.css",
        "/de/static/css/2.chunk.css"
    ];
    var to_add_js = [
        "/js/url_changer.js",
    ];

    for (var i = 0; i < to_add_css.length; i++) {
        var l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = remote_files_path + to_add_css[i] + "?v=" + version;
        document.body.appendChild(l);
    }

    for (var i = 0; i < to_add_js.length; i++) {
        var l = document.createElement("script");
        l.setAttribute("src", remote_files_path + to_add_js[i] + "?v=" + version);
        console.log(l)
        document.head.appendChild(l);
    }
}
var browserOk = checkBrowser();

if (browserOk) {
    var res_version = "1.0";
    var cfgFileName = json_config + ".json?v=" + res_version;
    var cfg_url = pathjoin(["configs", cfgFileName]);
    if (remote_files_path.endsWith("/")) {
        cfg_url = remote_files_path + cfg_url;
    }
    else {
        cfg_url = remote_files_path + "/" + cfg_url;
    }

    loadJson(cfg_url, function (data) {
        var cfg = JSON.parse(data);
        addResources(remote_files_path, res_version);
        addScript(remote_files_path + "/js/de_settings/settings.js" + "?v=" + res_version, function () { addReactScripts(cfg, remote_files_path, res_version); });
        addScript(remote_files_path+"/js/url_changer.js"+ "?v=" + res_version)
        if (data.helpUrl != "undefined")
            addHelpBox(cfg.helpUrl);
    });
}

