## Running ng build causes nginx container to 404

When you run ng build it is re-creating the dist folder which
then breaks your volume if doing something like:

docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx:alpine

It's OK to update the content but NOT blow away the folder
due to the volume that's created above.