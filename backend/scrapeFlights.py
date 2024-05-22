import requests
import json

url = "https://flights.booking.com/api/flights"



def get_oneway_flights(departureCode,destinationCode,departureDate,passengerCount,cabinClass):
    querystring = {"type":"ONEWAY","adults":f"{passengerCount}","cabinClass":f"{cabinClass}","children":"","from":f"{departureCode}.AIRPORT","to":f"{destinationCode}.AIRPORT","depart":f"{departureDate}","sort":"BEST","travelPurpose":"leisure","ca_source":"flights_index_sb","aid":"356980","label":"gog235jc-1DEg1mbGlnaHRzX2luZGV4KIICQgVpbmRleEgzWANotQGIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4ApDVkrIGwAIB0gIkNTVjZWUzNzctYjkxZC00M2ViLWIxOTctOWUwYjFkMjk5OGFi2AIE4AIB","enableVI":"1","enableDiscounts":"cug"}

    payload = ""
    headers = {"cookie": "px_init=0; cors_js=1; bkng_sso_session=e30; pcm_personalization_disabled=0; bkng_sso_ses=eyJib29raW5nX2dsb2JhbCI6W3siYSI6MSwiaCI6Ims4eGd5UXdueG40RVRjOTFoU2k5d0UrejB3Wk1CK2ZDTTlDaXM1aGYzODAifV19; pcm_consent=consentedAt%3D2024-05-15T12%3A04%3A08.440Z%26countryCode%3DPK%26expiresAt%3D2024-11-11T12%3A04%3A08.440Z%26implicit%3Dfalse%26regionCode%3DIS%26regulation%3Dnone%26legacyRegulation%3Dnone%26consentId%3D86697d11-1c37-4707-b6d0-fb9a13dc7267%26analytical%3Dtrue%26marketing%3Dtrue; bkng_sso_auth=CAIQsOnuTRp4SE59FWEdLlqHC7QBzv0mlTmFvKbW/GOvVWFT9xyJrMkR7wTAcGFJiI1b7IQxAduAroPxuJ+PZuAu16moFI1WEQKuRgizrzKyEsD7iFaSQfVKq9ArRFjb6u5jrYhu1j0iqSyLhrwGh31xshfqzStt3TzdANjJbgrn; aws-waf-token=ad7153e2-a22e-4beb-9944-78c46096710d:BQoAnXBWWvMhAQAA:V4jBby29mXQzaGdFoYVqgyPn8EKC9DSMjPTdhIxKLt8sqgJCDX/T2AgqXS9qAezqT+L8LpyuXjwD5637Sr6/+qBllYLwYFU1g9z1EYAT4z338jbvrF1TIIJdswGJoLgChrg69k9Un5dBkVw+yn9xUzw86ph6ns7SmMGoUp6/kPXnE7H+5tBP31o2hgw89bqoOHHnMJSDCs4GvfU7kOZnHHtHiEtvruA1GTU3Epw/J5lBzf7psiFkaViswIONRXqCZiQ=; lastSeen=1715776032728; fasc=5f57058a-028f-4146-b82a-dc68d85a37a4; pc_payer_id=fd4b1cf7-be38-432c-a3d0-1e55af26e543; fsc=s%3A4cefcb1cc6ccf164cbca59d07e0e7d70.XdnLQMfmqYSUB9fxGCjKc%2FvRtOFzI8a3Plfg5lh5g1E; fsc=s%3A4cefcb1cc6ccf164cbca59d07e0e7d70.XdnLQMfmqYSUB9fxGCjKc%2FvRtOFzI8a3Plfg5lh5g1E; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Mar+24+2024+19%3A57%3A07+GMT%2B0500+(Pakistan+Standard+Time)&version=202403.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=8f7b887f-f0bb-4218-9b9a-f1198779017d&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1&implicitConsentCountry=nonGDPR&implicitConsentDate=1711260420000&AwaitingReconsent=false; bkng=11UmFuZG9tSVYkc2RlIyh9YXjA6rtNF48dyfPzTHjBgvsxoIwCV9YuV5xQcTxZ%2BUNyXmaNh5uHFkp2PL9JJ38lk0hh4F16o47R7Qpe6ki3OG1nxJarmt5Oc9cAmedwquN1K9Daua7QKfGeW2wDEijWN4M3V8JzZ9hlX7hLCvdZvefsRR7P5Xs2Er0zzucIYvyr%2FahVA8Dl6o4%3D"}

    response = requests.request("GET", url, data=payload, headers=headers, params=querystring)
    return response.json()