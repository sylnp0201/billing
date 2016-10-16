class HomeController < ApplicationController
  def index
    # The default Angular root page
  end

  def letsencrypt
    # Serve the static encrypt file for letsencrypt
    render text: "TR16n1W-epmfYmUqlMYJ61Jjn9tmL-hsOK1ammY7AVk.RxvAg8JTJbpWA2yed9TN1FkRVaz-RgbCAtseLJA5VdM"
  end
end
