import re

img_path = "/Users/DD/Developer/website/Classmates-Website/img/china.svg"
data_path = "/Users/DD/Developer/website/Classmates-Website/others/pname.txt"
pattern = "title=\"(.*)\""
wfile = open(data_path, "w")

with open(img_path, 'r') as f:
	while True:
		line = f.readline()
		if not line:
			break
		else:
			re_obj = re.search(pattern, line)
			if re_obj:
				wfile.write(re_obj[1])
				wfile.write("\n")

wfile.close()

