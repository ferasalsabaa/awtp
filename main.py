from flask import Flask, render_template, request, Response
import xml.etree.ElementTree as ET


nonlinear_ad ='''<VAST version="4.2" xmlns="http://www.iab.com/VAST">
  <Ad id="20005" sequence="1" >
    <InLine>
      <AdSystem version="1">iabtechlab</AdSystem>
      <Error>
        <![CDATA[https://example.com/error]]>
      </Error>
      <Extensions>
        <Extension type="iab-Count">
          <total_available>
            <![CDATA[ 2 ]]>
          </total_available>
        </Extension>
      </Extensions>
      <Impression id="Impression-ID">
        <![CDATA[https://example.com/track/impression]]>
      </Impression>
      <Pricing model="cpm" currency="USD">
        <![CDATA[ 25.00 ]]>
      </Pricing>
      <AdServingId>a532d16d-4d7f-4440-bd29-2ec0e693fc80</AdServingId>
      <AdTitle>
        <![CDATA[VAST 4.0 Pilot - Scenario 5]]>
      </AdTitle>
      <Creatives>
        <Creative id="5480" sequence="1" adId="2447226">
          <NonLinearAds>
            <NonLinear width="350" height="350">
              <StaticResource creativeType="image/png">
                <![CDATA[https://mms.businesswire.com/media/20150623005446/en/473787/21/iab_tech_lab.jpg]]>
              </StaticResource>
              <NonLinearClickThrough>
                <![CDATA[https://iabtechlab.com]]>
              </NonLinearClickThrough>
              <NonLinearClickTracking>
                <![CDATA[https://example.com/tracking/clickTracking]]>
              </NonLinearClickTracking>
            </NonLinear>
          </NonLinearAds>
          <UniversalAdId idRegistry="Ad-ID">8465</UniversalAdId>
        </Creative>
      </Creatives>
      <Description>
        <![CDATA[VAST 4.0 sample tag for Non Linear ad (i.e Overlay ad). Change the StaticResources to have a tag with your own content. Change NonLinear tag's parameters accordingly to view desired results.]]>
      </Description>
    </InLine>
  </Ad>
</VAST>
'''

linear_ad ='''<VAST version="4.2" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.iab.com/VAST">
  <Ad id="20009" >
    <InLine>
      <AdSystem version="1">iabtechlab</AdSystem>
      <Error><![CDATA[https://example.com/error]]></Error>
      <Extensions>
        <Extension type="iab-Count">
          <total_available>
            <![CDATA[ 2 ]]>
          </total_available>
        </Extension>
      </Extensions>
      <Impression id="Impression-ID"><![CDATA[https://example.com/track/impression]]></Impression>
      <Pricing model="cpm" currency="USD">
        <![CDATA[ 25.00 ]]>
      </Pricing>
      <AdServingId>a532d16d-4d7f-4440-bd29-2ec0e693fc89</AdServingId>
      <AdTitle>iabtechlab video ad</AdTitle>
      <Category authority="https://www.iabtechlab.com/categoryauthority">AD CONTENT description category</Category>
      <Creatives>
        <Creative id="5480" sequence="1" adId="2447226">
          <Linear>
            <TrackingEvents>
              <Tracking event="start" ><![CDATA[https://example.com/tracking/start]]></Tracking>
              <Tracking event="progress" offset="00:00:10"><![CDATA[http://example.com/tracking/progress-10]]></Tracking>
              <Tracking event="firstQuartile"><![CDATA[https://example.com/tracking/firstQuartile]]></Tracking>
              <Tracking event="midpoint"><![CDATA[https://example.com/tracking/midpoint]]></Tracking>
              <Tracking event="thirdQuartile"><![CDATA[https://example.com/tracking/thirdQuartile]]></Tracking>
              <Tracking event="complete"><![CDATA[https://example.com/tracking/complete]]></Tracking>
            </TrackingEvents>
            <Duration>00:00:16</Duration>
            <MediaFiles>
              <MediaFile id="5241" delivery="progressive" type="video/mp4" bitrate="2000" width="1280" height="720" minBitrate="1500" maxBitrate="2500" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro.mp4]]>
              </MediaFile>
              <MediaFile id="5244" delivery="progressive" type="video/mp4" bitrate="1000" width="854" height="480" minBitrate="700" maxBitrate="1500" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro-mid-resolution.mp4]]>
              </MediaFile>
              <MediaFile id="5246" delivery="progressive" type="video/mp4" bitrate="600" width="640" height="360" minBitrate="500" maxBitrate="700" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro-low-resolution.mp4]]>
              </MediaFile>
            </MediaFiles>
            <VideoClicks>
              <ClickTracking>
                <![CDATA[http://myTrackingURL/clickTracking]]>
              </ClickTracking>
              <ClickThrough id="blog">
                <![CDATA[https://iabtechlab.com]]>
              </ClickThrough>
            </VideoClicks>
          </Linear>
          <UniversalAdId idRegistry="Ad-ID">8465</UniversalAdId>
        </Creative>
      </Creatives>
    </InLine>
  </Ad>
</VAST>
'''
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("tutorials_home.html")

@app.route("/tutorial1")
def tutorial1():
    return render_template("hello-world.html")

@app.route("/tutorial2")
def tutorial2():
    return render_template("rc-interaction.html")

@app.route("/tutorial3")
def tutorial3():
    return render_template("broadcast-object.html")

@app.route("/tutorial4")
def tutorial4():
    return render_template("logger_example.html")

@app.route("/tutorial5")
def tutorial5():
    return render_template("template_one.html")

@app.route("/tutorial6", methods=["GET", "POST"])
def tutorial6():
    if request.method == "POST":
        ad_url = request.form.get("ad_input")
        templates = request.form.get("templates")
        final_link = "***"

        if(templates == "nonlinear_video_ads"):
            final_link = nonlinear_ad.replace("https://mms.businesswire.com/media/20150623005446/en/473787/21/iab_tech_lab.jpg",ad_url)
        else:
            final_link = linear_ad.replace("https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro.mp4",ad_url)    
    
        return Response(final_link, mimetype='text/xml')
    return render_template("vast_generator.html")