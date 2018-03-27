function getCookie(e){var o=null;if(document.cookie&&""!=document.cookie)for(var t=document.cookie.split(";"),n=0;n<t.length;n++){var s=jQuery.trim(t[n]);if(s.substring(0,e.length+1)==e+"="){o=decodeURIComponent(s.substring(e.length+1));break}}return o}$.ajaxSetup({beforeSend:function(e,o){/^http:.*/.test(o.url)||/^https:.*/.test(o.url)||e.setRequestHeader("X-CSRFToken",getCookie("csrftoken"))}}),$(document).ready(function(){$(".context-help-icon").tooltip()}),$(document).on("click","[data-formset-add], .formset-copy",function(){$(".context-help-icon").tooltip()});var main={showAjaxMessages:function(e){"ajax_message_block"in e&&($(".bootstrap-messages-container").hide("slow"),$(".bootstrap-messages-container").html(e.ajax_message_block),$(".bootstrap-messages-container").show("slow"))}};
var editor={copyFilterSet:function(e){var i="#filterSetContainer";$(document).one("formAdded",i,function(i){var t=$(i.target),r=$(e).closest("[data-formset-form]");["filter_label","filter_color","filter_source_ip"].forEach(function(e){var i="."+e+" input";t.find(i).val(r.find(i).val())}),["filter_report_receiver_domain","filter_report_sender","filter_raw_spf_domain","filter_raw_spf_result","filter_raw_dkim_domain","filter_raw_dkim_result","filter_aligned_spf_result","filter_aligned_dkim_result","filter_disposition"].forEach(function(e){var i="."+e+" select",d=t.find(i)[0].selectize,a=r.find(i)[0].selectize;for(var n in a.options){var o=a.options[n].value,l=a.options[n].text;d.addOption({value:o,text:l}),-1!=a.items.indexOf(o)&&d.addItem(o,!0),d.refreshItems()}i=".filter_multiple_dkim input";t.find(i).prop("checked",r.find(i).is(":checked"))})}),$(i).data("formset").addForm()},toggleDateRange:function(){var e=$("[name='dr_type']:checked").val();$("[name='dr_type']").closest(".radio").removeClass("active"),1==e?($("[name='dr_type']:checked").closest(".radio").addClass("active"),$("#id_quantity, #id_unit").prop("disabled",!0).val(null),$("#id_quantity_container, #id_unit_container").addClass("disabled"),$("#id_begin, #id_end").prop("disabled",!1),$("#id_begin_container, #id_end_container").removeClass("disabled")):2==e&&($("[name='dr_type']:checked").closest(".radio").addClass("active"),$("#id_begin, #id_end").prop("disabled",!0).val(null),$("#id_begin_container, #id_end_container").addClass("disabled"),$("#id_quantity, #id_unit").prop("disabled",!1),$("#id_quantity_container, #id_unit_container").removeClass("disabled"))},_xhr:null,loadChoices:function(e){!e.length||e.length<3||(editor._xhr&&editor._xhr.abort(),this.load(function(i){editor._xhr=$.ajax({url:"/choices-async/",data:{report_type:$("[name='report_type']").val(),choice_type:this.settings.load_choice_type,query_str:e},success:function(e){var t=e.choices.map(function(e){return{value:e,text:e}});i(t)},error:function(){i()}})}))}};
var analysis={overview:{init:function(a){$("#t"+a+"-container").addClass("loading"),$.get("/overview-async/",{report_type:a},function(t){analysis.overview.appendPies(t,"#t"+a+"-container .charts-container"),$("#t"+a+"-domain-cnt").html(t.domain_cnt),$("#t"+a+"-report-cnt").html(t.report_cnt),$("#t"+a+"-message-cnt").html(t.message_cnt),$("#t"+a+"-container .text-container").show()}).always(function(){$("#t"+a+"-container").removeClass("loading")})},appendPies:function(a,t){function e(a,t){var e=[];return t.forEach(function(t){var n=a.filter(function(a){if(a.label==t)return!0});n.length>0&&e.push(n[0])}),e}a.dkim=e(a.dkim,["pass","fail"]),a.spf=e(a.spf,["pass","fail"]),a.disposition=e(a.disposition,["none","quarantine","reject"]),["dkim","spf","disposition"].forEach(function(e){var n,l=50,i=50;n="disposition"==e?d3.scale.ordinal().domain(["reject","quarantine","none"]).range(["#e41a1c","#ff7f00","#4daf4a"]):d3.scale.ordinal().domain(["fail","pass"]).range(["#e41a1c","#4daf4a"]);var s=d3.svg.arc().outerRadius(80).innerRadius(0),r=d3.layout.pie().sort(null).value(function(a){return a.cnt}),o=d3.select(t).append("svg").attr("class",e).attr("width",250+i).attr("height",200+l).append("g").attr("transform","translate("+(125+i)+","+(100+l)+")").selectAll(".arc").data(r(a[e])).enter().append("g").attr("class","arc");o.append("path").attr("d",s).style("fill",function(a){return n(a.data.label)}),title="spf"==e||"dkim"==e?"aligned "+e.toUpperCase():e.toUpperCase(),o.append("text").attr("transform","translate(0, -120)").attr("text-anchor","middle").text(title);var d={legendItems:a[e].map(function(a){return{color:n(a.label),name:a.cnt+" "+a.label}})};o.append("g").attr("class","legend").attr("transform","translate(-160, -100)").style("font-size","12px").call(d3.legend,d)})}},map:{_map:null,_dataSets:[],_mapDataSets:[],_width:null,_countryCodeMapping:{AF:"AFG",AX:"ALA",AL:"ALB",DZ:"DZA",AS:"ASM",AD:"AND",AO:"AGO",AI:"AIA",AQ:"ATA",AG:"ATG",AR:"ARG",AM:"ARM",AW:"ABW",AU:"AUS",AT:"AUT",AZ:"AZE",BS:"BHS",BH:"BHR",BD:"BGD",BB:"BRB",BY:"BLR",BE:"BEL",BZ:"BLZ",BJ:"BEN",BM:"BMU",BT:"BTN",BO:"BOL",BQ:"BES",BA:"BIH",BW:"BWA",BV:"BVT",BR:"BRA",IO:"IOT",BN:"BRN",BG:"BGR",BF:"BFA",BI:"BDI",CV:"CPV",KH:"KHM",CM:"CMR",CA:"CAN",KY:"CYM",CF:"CAF",TD:"TCD",CL:"CHL",CN:"CHN",CX:"CXR",CC:"CCK",CO:"COL",KM:"COM",CD:"COD",CG:"COG",CK:"COK",CR:"CRI",CI:"CIV",HR:"HRV",CU:"CUB",CW:"CUW",CY:"CYP",CZ:"CZE",DK:"DNK",DJ:"DJI",DM:"DMA",DO:"DOM",EC:"ECU",EG:"EGY",SV:"SLV",GQ:"GNQ",ER:"ERI",EE:"EST",ET:"ETH",FK:"FLK",FO:"FRO",FJ:"FJI",FI:"FIN",FR:"FRA",GF:"GUF",PF:"PYF",TF:"ATF",GA:"GAB",GM:"GMB",GE:"GEO",DE:"DEU",GH:"GHA",GI:"GIB",GR:"GRC",GL:"GRL",GD:"GRD",GP:"GLP",GU:"GUM",GT:"GTM",GG:"GGY",GN:"GIN",GW:"GNB",GY:"GUY",HT:"HTI",HM:"HMD",VA:"VAT",HN:"HND",HK:"HKG",HU:"HUN",IS:"ISL",IN:"IND",ID:"IDN",IR:"IRN",IQ:"IRQ",IE:"IRL",IM:"IMN",IL:"ISR",IT:"ITA",JM:"JAM",JP:"JPN",JE:"JEY",JO:"JOR",KZ:"KAZ",KE:"KEN",KI:"KIR",KP:"PRK",KR:"KOR",KW:"KWT",KG:"KGZ",LA:"LAO",LV:"LVA",LB:"LBN",LS:"LSO",LR:"LBR",LY:"LBY",LI:"LIE",LT:"LTU",LU:"LUX",MO:"MAC",MK:"MKD",MG:"MDG",MW:"MWI",MY:"MYS",MV:"MDV",ML:"MLI",MT:"MLT",MH:"MHL",MQ:"MTQ",MR:"MRT",MU:"MUS",YT:"MYT",MX:"MEX",FM:"FSM",MD:"MDA",MC:"MCO",MN:"MNG",ME:"MNE",MS:"MSR",MA:"MAR",MZ:"MOZ",MM:"MMR",NA:"NAM",NR:"NRU",NP:"NPL",NL:"NLD",NC:"NCL",NZ:"NZL",NI:"NIC",NE:"NER",NG:"NGA",NU:"NIU",NF:"NFK",MP:"MNP",NO:"NOR",OM:"OMN",PK:"PAK",PW:"PLW",PS:"PSE",PA:"PAN",PG:"PNG",PY:"PRY",PE:"PER",PH:"PHL",PN:"PCN",PL:"POL",PT:"PRT",PR:"PRI",QA:"QAT",RE:"REU",RO:"ROU",RU:"RUS",RW:"RWA",BL:"BLM",SH:"SHN",KN:"KNA",LC:"LCA",MF:"MAF",PM:"SPM",VC:"VCT",WS:"WSM",SM:"SMR",ST:"STP",SA:"SAU",SN:"SEN",RS:"SRB",SC:"SYC",SL:"SLE",SG:"SGP",SX:"SXM",SK:"SVK",SI:"SVN",SB:"SLB",SO:"SOM",ZA:"ZAF",GS:"SGS",SS:"SSD",ES:"ESP",LK:"LKA",SD:"SDN",SR:"SUR",SJ:"SJM",SZ:"SWZ",SE:"SWE",CH:"CHE",SY:"SYR",TW:"TWN",TJ:"TJK",TZ:"TZA",TH:"THA",TL:"TLS",TG:"TGO",TK:"TKL",TO:"TON",TT:"TTO",TN:"TUN",TR:"TUR",TM:"TKM",TC:"TCA",TV:"TUV",UG:"UGA",UA:"UKR",AE:"ARE",GB:"GBR",UM:"UMI",US:"USA",UY:"URY",UZ:"UZB",VU:"VUT",VE:"VEN",VN:"VNM",VG:"VGB",VI:"VIR",WF:"WLF",EH:"ESH",YE:"YEM",ZM:"ZMB",ZW:"ZWE"},_defaults:{defaultFill:"white",defaultBorderColor:"darkgrey",defaultBorderWidth:.4,defaultBorderHoverWidth:1},createColorRange:function(a,t){for(var e=d3.hsl(a),n=.8/t,l=[],i=0;i<t;i++)e.l=.8-i*n,l.push(e.toString());return l},init:function(a){$(".view-type-map .svg-container").addClass("loading"),d3.json("/map-async/"+a+"/",function(a,t){if($(".view-type-map .svg-container").removeClass("loading"),a||t.length<1)return console.warn(a),!1;analysis.map._dataSets=t,analysis.map._width=$(".view-type .svg-container").width(),analysis.map._dataSets.forEach(function(a,t){var e=d3.max(a.data.map(function(a){return a.cnt})),n=analysis.map.createColorRange(a.color,4),l=d3.scale.quantile().domain([1,e]).range(n),i={};a.data.forEach(function(a){var t=l(a.cnt)||n[n.length-1];i[analysis.map._countryCodeMapping[a.country_iso_code]]={count:a.cnt,fillKey:t,highlightFillColor:t}});var s={defaultFill:analysis.map._defaults.defaultFill},r=[];n.forEach(function(a){s[a]=a;var t=l.invertExtent(a);r.push({color:a,name:Math.round(t[0])+" - "+Math.round(t[1])})}),analysis.map._mapDataSets.push({fills:s,labels:r,data:i});var o=$("<button>",{class:"btn btn-default",value:t});o.append($("<span>",{class:"circle",style:"background-color:"+a.color})),o.append($("<span></span>").text(a.label)),$(".view-type-map .btn-group").append(o)}),analysis.map._map=new Datamap({element:$(".view-type-map .svg-container").get(0),projection:"mercator",width:analysis.map._width,height:analysis.map._width/5*3,geographyConfig:{borderColor:analysis.map._defaults.defaultBorderColor,borderWidth:analysis.map._defaults.defaultBorderWidth,highlightFillColor:analysis.map._defaults.defaultFill,highlightBorderColor:analysis.map._defaults.defaultBorderColor,highlightBorderWidth:analysis.map._defaults.defaultBorderHoverWidth,popupTemplate:function(a,t){return text=a.properties.name+": "+(t?t.count:"no")+" mail(s)",$hoverInfo=$("<div>",{class:"hoverinfo",text:text}),$hoverInfo.prop("outerHTML")}},fills:{defaultFill:analysis.map._defaults.defaultFill}}),$(".view-type-map .btn-group button").on("click",function(a){analysis.map.update(this)}),$(".view-type-map .btn-group button:first-child").click()})},update:function(a){$(a).siblings().removeClass("active"),$(a).addClass("active");var t=analysis.map._mapDataSets[$(a).val()],e=analysis.map._dataSets[$(a).val()].label;$(".view-type-map .datamaps-subunits path[data-info]").css({fill:analysis.map._defaults.defaultFill}).attr("data-info",null),analysis.map._map.options.fills=t.fills,analysis.map._map.updateChoropleth(t.data);var n={legendItems:t.labels.map(function(a){return{color:a.color,name:a.name+" mails"}})};analysis.map._map.svg.selectAll("g.legend").remove(),analysis.map._map.svg.append("g").attr("class","legend no-resize").attr("transform","translate(20,20)").call(d3.legend,n).selectAll("g").attr("class","no-resize"),analysis.map._map.svg.selectAll(".map-title").remove(),analysis.map._map.svg.append("text").attr("class","map-title").attr("text-anchor","middle").attr("transform","translate("+analysis.map._width/2+", 30)").style("font-weight","bold").text("Mails per country for '"+e+"'")}},line:{_data:null,_dataSetsLine:null,_defaults:{margin:{top:40,right:60,bottom:120,left:80},marginMini:{top:430,right:60,bottom:20,left:80}},init:function(a){$(".view-type-linechart .svg-container").addClass("loading"),d3.json("/line-async/"+a+"/",function(a,t){if($(".view-type-linechart .svg-container").removeClass("loading"),a||t.length<1)return console.warn(a),!1;analysis.line._data=t;var e=d3.time.format("%Y%m%d").parse,n=analysis.line._data.data_sets,l=e(analysis.line._data.begin),i=e(analysis.line._data.end),s=$(".view-type .svg-container").width(),r=s-analysis.line._defaults.margin.left-analysis.line._defaults.margin.right,o=500-analysis.line._defaults.margin.top-analysis.line._defaults.margin.bottom,d=500-analysis.line._defaults.marginMini.top-analysis.line._defaults.marginMini.bottom,p=d3.time.scale().range([0,r]),c=d3.scale.linear().range([o,0]),m=d3.time.scale().range([0,r]),f=d3.scale.linear().range([d,0]),u=d3.time.format.multi([["%b %d",function(a){return 1!=a.getDate()}],["%B",function(a){return a.getMonth()}],["%Y",function(){return!0}]]),g=d3.svg.axis().scale(p).orient("bottom"),h=d3.svg.axis().scale(c).orient("left"),y=d3.svg.axis().scale(m).orient("bottom");g.tickFormat(u);var M=d3.svg.axis().scale(p).orient("bottom").tickSize(-o,0,0).tickFormat(""),A=d3.svg.axis().scale(c).orient("left").tickSize(-r,0,0).tickFormat(""),v=d3.svg.brush().x(m).on("brush",function(){p.domain(v.empty()?m.domain():v.extent()),C.selectAll(".line").attr("d",_),C.select(".x.axis").call(g),C.select(".x.grid").call(M),S.selectAll(".grid .tick").style("stroke","#DADADA"),S.selectAll(".tick text").style("font-size","10px")}).on("brushend",function(){analysis.table.addDateTimeFilter(p.domain())}),S=d3.select(".view-type-linechart .svg-container").append("svg").attr("width",r+analysis.line._defaults.margin.left+analysis.line._defaults.margin.right).attr("height",o+analysis.line._defaults.margin.top+analysis.line._defaults.margin.bottom);S.append("defs").append("clipPath").attr("id","clip").append("rect").attr("width",r).attr("height",500);var C=S.append("g").attr("class","focus").attr("transform","translate("+analysis.line._defaults.margin.left+","+analysis.line._defaults.margin.top+")"),T=S.append("g").attr("class","context").attr("transform","translate("+analysis.line._defaults.marginMini.left+","+analysis.line._defaults.marginMini.top+")"),_=d3.svg.line().x(function(a){return p(a.date)}).y(function(a){return c(a.cnt)}),R=d3.svg.line().x(function(a){return m(a.date)}).y(function(a){return f(a.cnt)});n.forEach(function(a){a.data.forEach(function(a){a.date=e(a.date)})});var B=d3.time.day.range(l,i);n.forEach(function(a){data_len=a.data.length,data_tmp=[];for(var t=0,e=0;e<B.length;e++)data_len>t&&+B[e]==+a.data[t].date?(cnt=a.data[t].cnt,t+=1):cnt=0,data_tmp.push({date:B[e],cnt:cnt});a.data=data_tmp}),p.domain([l,i]),c.domain([0,d3.max([].concat.apply([],n.map(function(a){return a.data.map(function(a){return a.cnt})})))]),m.domain(p.domain()),f.domain(c.domain()),n.forEach(function(a,t){C.append("path").datum(a.data).attr("class","line").attr("d",_).attr("stroke",a.color),T.append("path").datum(a.data).attr("class","line").attr("d",R).attr("stroke",a.color)}),C.append("g").attr("class","x axis").attr("transform","translate(0,"+o+")").call(g),C.append("g").attr("class","y axis").call(h),C.insert("g",":first-child").attr("class","x grid").attr("transform","translate(0,"+o+")").call(M),C.insert("g",":first-child").attr("class","y grid").call(A),S.append("text").attr("class","y label").attr("transform","rotate(-90)translate("+o/2*-1+", 25)").text("Mail count"),T.append("g").attr("class","x axis").attr("transform","translate(0,"+d+")").call(y),T.append("g").attr("class","x brush").call(v).selectAll("rect").attr("y",-6).attr("height",d+7),S.selectAll(".brush .extent").style("stroke","#fff").style("fill-opacity",.125).style("shape-rendering","crispEdges"),S.selectAll(".label").style("text-anchor","middle"),S.selectAll("path").style("stroke-width",2).style("fill","none").style("clip-path","url(#clip)"),S.selectAll("rect").style("stroke-width",2),S.selectAll(".axis path, .axis line").style("fill","none").style("stroke","#DADADA").style("stroke-width",1).style("shape-rendering","crispEdges"),S.selectAll(".grid .tick").style("stroke","#DADADA"),S.selectAll(".tick text").style("font-size","10px"),S.selectAll(".grid path").style("stroke-width",0),C.append("g").attr("class","legend").attr("transform","translate(20,20)").call(d3.legend,{legendItems:n.map(function(a){return{color:a.color,name:a.label}})}),S.append("text").attr("text-anchor","middle").attr("transform","translate("+s/2+", "+analysis.line._defaults.margin.top/2+")").style("font-weight","bold").text("Mails over time")})}},table:{_api:null,_tableTimes:[],addDateTimeFilter:function(a){var t=d3.time.format("%Y/%m/%d");$dataTableWrapper=$(".dataTables_wrapper"),analysis.table._api&&($filterContainer=$dataTableWrapper.find(".table-quick-filter"),$filterContainer.length<1&&($filterContainer=$("<div>",{class:"table-quick-filter"}),$dataTableWrapper.prepend($filterContainer)),$filterContainer.html("Filtering from <strong>"+t(a[0])+"</strong> to <strong>"+t(a[1])+"</strong"),analysis.table._tableTimes=a,analysis.table._api.ajax.reload())},init:function(a){analysis.table._api=$(".view-type-table table").DataTable({ajax:{url:"/table-async/"+a+"/",type:"POST",data:function(a){return a.custom_filters={time:analysis.table._tableTimes},{data:JSON.stringify(a)}}},searching:!1,serverSide:!0,processing:!0,language:{processing:""}})}},export:{svg:function(a,t,e){var n=$(e).closest(".view-type").find(".svg-container svg").get(0),l=(new XMLSerializer).serializeToString(n);$("<form>",{action:"/export-svg/"+a+"/",target:"_blank",method:"POST"}).append($("<textarea>",{name:"svg"}).val(l)).append($("<input>",{type:"hidden",name:"view_type",value:t})).append($("<input>",{type:"hidden",name:"csrfmiddlewaretoken",value:getCookie("csrftoken")})).hide().appendTo(document.body).submit()},csv:function(a){$("<form>",{action:"/export-csv/"+a+"/",target:"_blank",method:"POST"}).append($("<input>",{type:"hidden",name:"csrfmiddlewaretoken",value:getCookie("csrftoken")})).hide().appendTo(document.body).submit().remove()}}};
d3.legend=function(t,e){return t.each(function(){var t=d3.select(this),n=t.selectAll(".legend-box").data([!0]),l=t.selectAll(".legend-items").data([!0]),r=12,a=r/2;n.enter().append("rect").classed("legend-box",!0),l.enter().append("g").classed("legend-items",!0),n.style("fill","white").style("stroke","black").style("stroke-width","0.5px"),l.selectAll("text").data(e.legendItems).call(function(t){t.enter().append("text")}).call(function(t){t.exit().remove()}).style("font-size",r).attr("transform",function(t,e){return"translate("+(10+2*a+10)+", "+(10+5*e+(e+1)*r-2)+")"}).text(function(t){return t.name}),l.selectAll("circle").data(e.legendItems).call(function(t){t.enter().append("circle")}).call(function(t){t.exit().remove()}).attr("cx",a).attr("cy",a).attr("transform",function(t,e){return"translate(10, "+(2*e*a+5*e+10)+")"}).attr("r",a).style("fill",function(t){return t.color});var c=l[0][0].getBBox();n.attr("height",c.height+20).attr("width",c.width+20)}),t};