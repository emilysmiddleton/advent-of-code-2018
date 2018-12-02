total=0;
while read p
    do next="${p/+/}"
    total=$[$total + $next]
done < input.txt
echo $total
