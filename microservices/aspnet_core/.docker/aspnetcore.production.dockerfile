FROM microsoft/aspnetcore

LABEL author="Dan Wahlin" 

ENV ASPNETCORE_URLS=http://*:5000

# Run dotnet publish -c Release -o dist 
COPY ./dist /var/www/aspnetcoreapp

WORKDIR /var/www/aspnetcoreapp

ENTRYPOINT ["dotnet", "AspNetCorePostgreSQLDockerApp.dll"]












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