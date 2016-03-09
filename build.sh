
scores=( "continuous" "continuous-fades" "continuous-short-clips" "length-pyramid" "volume-pyramid" )
configs=( "bourne_1_2" "bourne_3_4_chase" "bourne_3_4_fight" "bourne_3_4" )

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
