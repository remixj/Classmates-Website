import json
import os
import django
os.environ["DJANGO_SETTINGS_MODULE"] =  "ClassmatesDistribution.settings"
django.setup()
from CDapp.models import Province

province_city_pair = open("others/cprelations.json", "r")
city_positions_pair = open("others/cpositions.json", "r")

pcity_data = json.load(province_city_pair)
cpositions_data = json.load(city_positions_pair)

province_city_pair.close()
city_positions_pair.close()

for province_name in pcity_data.keys():
    city = pcity_data[province_name]
    positions = cpositions_data[city]
    province, created = Province.objects.get_or_create(name=province_name,
                                                       capital_city=city,
                                                       position_x=positions[0],
                                                       position_y=positions[1])
    province.save()