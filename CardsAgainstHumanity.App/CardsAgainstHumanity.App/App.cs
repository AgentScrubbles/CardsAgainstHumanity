using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardsAgainstHumanity.Plug;
using Xamarin.Forms;

namespace CardsAgainstHumanity.App
{
    public class App : Application
    {
        private Connection _connection;
        public App()
        {
            _connection = new Connection();
            // The root page of your application
            MainPage = new ContentPage
            {
                Content = new StackLayout
                {
                    VerticalOptions = LayoutOptions.Center,
                    Children = {
                        new Label {
                            XAlign = TextAlignment.Center,
                            Text = "Welcome to Xamarin Forms!"
                        }
                    }
                }
            };
        }

        protected override void OnStart()
        {
            try
            {
                var gameId = Task.Run(() => _connection.CreateGame()).Result;
            }
            catch (Exception ex)
            {
                
            }
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
