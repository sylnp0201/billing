module Api
  class ApiController < ApplicationController

    before_action :authenticate_api_user!
    before_action :set_user

    private

      def set_user
        @current_user = current_api_user
      end

  end
end
