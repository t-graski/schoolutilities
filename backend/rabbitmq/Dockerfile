FROM rabbitmq:3.11.0-management
COPY ./rabbitmq_delayed_message_exchange-3.11.1.ez /opt/rabbitmq/plugins/
RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange
RUN rabbitmq-plugins list 