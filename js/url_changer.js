(function () {

    function addQueryParam(url, paramName, paramVal) {
        let newParamChar = "?";
        if (url.indexOf("?") !== -1) {
            newParamChar = "&";
        }
        return url + newParamChar + paramName + "=" + paramVal;
    }

    document.getElementById('root').addEventListener('unicef_dataflowLoaded', function (evt) {
        let url = window.location.href;

        //replace the trainling / if present
        let newDq = evt.detail.dataquery.replace(/\/$/, "");

        let urlRepl = url;
        //The dataquery
        if (urlRepl.indexOf("dq") === -1) {
            urlRepl = addQueryParam(urlRepl, "dq", newDq);
        }
        else {
            urlRepl = url.replace(/dq=[^&]*/, "dq=" + newDq);
        }
        //The startPeriod
        if (urlRepl.indexOf("startPeriod") === -1) {
            urlRepl = addQueryParam(urlRepl, "startPeriod", evt.detail.requestArgs.startPeriod);
        }
        else {

            urlRepl = urlRepl.replace(/startPeriod=[^&]*/, "startPeriod=" + evt.detail.requestArgs.startPeriod);
        }

        //The endPeriod
        if (urlRepl.indexOf("endPeriod") === -1) {
            urlRepl = addQueryParam(urlRepl, "endPeriod", evt.detail.requestArgs.endPeriod);
        }
        else {
            urlRepl = urlRepl.replace(/endPeriod=[^&]*/, "endPeriod=" + evt.detail.requestArgs.endPeriod);
        }

        //is the lastnobservations active? add it
        if (evt.detail.requestArgs.lastnobservations) {
            //The lastnobs
            if (urlRepl.indexOf("lastnobservations") === -1) {
                urlRepl = addQueryParam(urlRepl, "lastnobservations", evt.detail.requestArgs.lastnobservations);
            }
            else {
                urlRepl = urlRepl.replace(/lastnobservations=[^&]*/, "lastnobservations=" + evt.detail.requestArgs.lastnobservations);
            }
        }//else completely remove the param if it exists
        else{
            if (urlRepl.indexOf("lastnobservations") !== -1) {
                urlRepl = urlRepl.replace(/&lastnobservations=[^&]*/, "");
            }
        }


        window.history.pushState({}, "UNICEF Data", urlRepl);
    });

})();