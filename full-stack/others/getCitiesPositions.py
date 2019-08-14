# 73°40′(东经，最西)，53°30(北纬，最北)
# 135度2'（东经，最东），3度52分（北纬，最南）
import json

data_path = '/Users/DD/Developer/website/Classmates-Website-test/others/city-geodata-en.txt'
file_path = '/Users/DD/Developer/website/Classmates-Website-test/others/cpositions.json'
city_positions = {}
wfile = open(file_path, 'w')
std_west = 73.40
std_north = 53.30
std_east = 135.02
std_south = 18.20

with open(data_path, 'r') as f:
    while True:
        line = f.readline()
        if not line:
            break
        else:
            data = line.split(',')
            tmp_data = [float(position) for position in data[1::]]
            city_positions[data[0]] = tmp_data

for key in city_positions.keys():
    ll = city_positions[key]
    city_positions[key] = [(ll[0]-std_west)/(std_east-std_west),
                           1-(ll[1]-std_south)/(std_north-std_south)]


json_file = json.dumps(city_positions, indent=4)
# wfile.write(key+' ')
# wfile.write(str(city_positions[key][0])+' ')
# wfile.write(str(city_positions[key][1])+'\n')
wfile.write(json_file)
wfile.close()

# [0.8114248620577734, 0.23101647247890722]
# 0.6333982473222979