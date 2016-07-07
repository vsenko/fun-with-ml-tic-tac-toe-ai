cd data
sort ai-minimax-debug.csv | uniq > ai-minimax-debug-uniq.csv
sort -R ai-minimax-debug-uniq.csv > ai-minimax-debug-uniq-random.csv
head -n 1000 ai-minimax-debug-uniq-random.csv > train.csv
tail -n 200 ai-minimax-debug-uniq-random.csv > test.csv
