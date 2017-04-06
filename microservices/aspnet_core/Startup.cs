using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AspNetCorePostgreSQLDockerApp.Repository;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Swashbuckle.Swagger.Model;
using Microsoft.Extensions.PlatformAbstractions;

namespace AspNetCorePostgreSQLDockerApp
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //Add PostgreSQL support
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<DockerCommandsDbContext>(options =>
                    options.UseNpgsql(Configuration["Data:DbContext:DockerCommandsConnectionString"]))
                .AddDbContext<CustomersDbContext>(options =>
                    options.UseNpgsql(Configuration["Data:DbContext:CustomersConnectionString"]));


            services.AddMvc();

            // Add our PostgreSQL Repositories (scoped to each request)
            services.AddScoped<IDockerCommandsRepository, DockerCommandsRepository>();
            services.AddScoped<ICustomersRepository, CustomersRepository>();
            
            //Transient: Created each time they're needed
            services.AddTransient<DockerCommandsDbSeeder>();
            services.AddTransient<CustomersDbSeeder>();

            //Nice article by Shayne Boyer here on Swagger:
            //https://docs.asp.net/en/latest/tutorials/web-api-help-pages-using-swagger.html
            services.AddSwaggerGen();
            services.ConfigureSwaggerGen(options =>
            {
                options.SingleApiVersion(new Info
                {
                    Version = "v1",
                    Title = "ASP.NET Core Customers API",
                    Description = "ASP.NET Core Customers Web API documentation",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Dan Wahlin", Url = "http://twitter.com/danwahlin"},
                    License = new License { Name = "MIT", Url = "https://en.wikipedia.org/wiki/MIT_License" }
                });

                //Enable following for XML comment support and add "xmlDoc": true to buildOptions in project.json

                //Base app path 
                //var basePath = PlatformServices.Default.Application.ApplicationBasePath;

                //Set the comments path for the swagger json and ui.
                //options.IncludeXmlComments(basePath + "\\yourAPI.xml");

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
                              DockerCommandsDbSeeder dockerCommandsDbSeeder, CustomersDbSeeder customersDbSeeder)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();

            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUi();

            //This would need to be locked down as needed (very open right now)
            app.UseCors((corsPolicyBuilder) => 
            {
                corsPolicyBuilder.AllowAnyOrigin();
                corsPolicyBuilder.AllowAnyMethod();
                corsPolicyBuilder.AllowAnyHeader();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            customersDbSeeder.SeedAsync(app.ApplicationServices).Wait();
            dockerCommandsDbSeeder.SeedAsync(app.ApplicationServices).Wait();

        }

    }
}
