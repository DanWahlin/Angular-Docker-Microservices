FROM microsoft/dotnet:1.1.1-sdk

MAINTAINER Dan Wahlin, Shayne Boyer

ENV ASPNETCORE_URLS=http://*:5000

COPY . /var/www/aspnetcoreapp

WORKDIR /var/www/aspnetcoreapp

#Install Node
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - \
   	&& apt-get install -qqy nodejs

RUN ["npm", "install"]

CMD ["/bin/bash", "-c", "dotnet restore && dotnet run"]











# Build the image:
# docker build -f aspnetcore.production.dockerfile -t [yourDockerHubID]/dotnet:1.0.0
# docker push

# Option 1
# Start PostgreSQL and ASP.NET Core (link ASP.NET core to ProgreSQL container with legacy linking)
 
# docker run -d --name my-postgres -e POSTGRES_PASSWORD=password postgres
# docker run -d -p 5000:5000 --link my-postgres:postgres [yourDockerHubID]/dotnet:1.0.0

# Option 2: Create a custom bridge network and add containers into it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name postgres -e POSTGRES_PASSWORD=password postgres
# docker run -d --net=isolated_network --name aspnetcoreapp -p 5000:5000 [yourDockerHubID]/dotnet:1.0.0