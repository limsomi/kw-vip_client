import csv
import json

input_file_name = "result.csv"
output_file_name = "./src/Component/Search/sales&rent.json"

# input_file_name = "추정월세_4개구.csv"
# output_file_name = "./src/Component/Search/estimated_rent.json"
with open(input_file_name, "r", encoding="utf-8", newline="") as input_file, \
        open(output_file_name, "w", encoding="utf-8", newline="") as output_file:
        
    reader = csv.reader(input_file)

    # 첫 줄은 col_names 리스트로 읽어 놓고
    col_names = next(reader)
    data=dict()
    sample=list()

    # 그 다음 줄부터 zip으로 묶어서 json으로 dumps
    for cols in reader:
        doc = {col_name: col for col_name, col in zip(col_names, cols)}
        sample.append(doc)

    data['value']=sample
    print(json.dumps(data, ensure_ascii=False,indent='\t'), file=output_file)