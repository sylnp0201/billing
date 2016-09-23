module Api
  class DownloadsController < ApiController

    def create
      begin
        @download = @current_user.downloads.create!(token: SecureRandom.uuid)
        render json: @download
      rescue ActiveRecord::RecordInvalid => e
        render :json => { message: e }, :status => :unprocessable_entity
      end
    end

  end
end
