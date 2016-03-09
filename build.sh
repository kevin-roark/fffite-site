
scores=( "continuous" "continuous-fades" "continuous-short-clips" "length-pyramid" "volume-pyramid" )
configs=(
  "bourne_1_1" "bourne_1_2" "bourne_1_3" "bourne_1_4" "bourne_1_5"
  "bourne_2_1" "bourne_2_2" "bourne_2_4"
  "bourne_3_1" "bourne_3_3" "bourne_3_4" "bourne_3_4_run" "bourne_3_4_fight" "bourne_3_6"
  "bourne" "bourne_fight" "bourne_run" "bourne_chase"
)

for config in "${configs[@]}"
do
  for score in "${scores[@]}"
  do
    combo=$config"__"$score

    # clear existing build
    rm -rf films/$combo

    # make new folder and copy template
    mkdir films/$combo
    mkdir films/$combo/js
    cp template/index.html films/$combo/

    # run frampton on combo
    ../frampton/src/cli/web-bundle.js scores/$score.js media_config/$config.json --out ./ --onlyscore
    cp js/build.js films/$combo/js

  done
done
